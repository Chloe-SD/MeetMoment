// src/screens/MeetingView.tsx
import React, { useState, useEffect } from 'react';
import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Alert } from "react-native";
import { Meeting, Day } from "../types";
import TimeBlockSelector from "../components/TimeBlockSelector";
import { useUser } from '../context/UserContext';
import { UpdateMeeting } from '../utils/DataManager';

export default function MeetingView({ meeting, onClose }: { meeting: Meeting; onClose: () => void }) {
  const { user } = useUser();
  const [localDays, setLocalDays] = useState<Day[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Check if participantAvailability exists and has an entry for the user
      if (meeting.participantAvailability && meeting.participantAvailability[user.email]) {
        setLocalDays(meeting.participantAvailability[user.email]);
      } else {
        // If not, fall back to the meeting's days
        setLocalDays(meeting.days);
      }
    }
    setIsLoading(false);
  }, [user, meeting]);

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit availability.');
      return;
    }

    try {
      const updatedMeeting: Meeting = {
        ...meeting,
        participantAvailability: {
          ...meeting.participantAvailability,
          [user.email]: localDays,
        },
        participants: meeting.participants.map(p =>
          p.email === user.email ? { ...p, status: 'confirmed' } : p
        ),
      };
      await UpdateMeeting(updatedMeeting);
      onClose();
    } catch (error) {
      console.error('Error updating meeting:', error);
      Alert.alert('Error', 'Failed to update meeting. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>You must be logged in to view this meeting.</Text>
        <Button title="Back" onPress={onClose} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.meetingTitle}>Meeting Title: {meeting.title}</Text>
        <TimeBlockSelector
          days={localDays}
          onBlockToggle={(dayIndex, blockIndex) => {
            const newDays = [...localDays];
            newDays[dayIndex].blocks[blockIndex].available = !newDays[dayIndex].blocks[blockIndex].available;
            setLocalDays(newDays);
          }}
          isCreator={meeting.creatorEmail === user.email}
          creatorDays={meeting.days}
        />
        <Button title="Submit Availability" onPress={handleSubmit} />
        <Button title="Back" onPress={onClose} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  meetingTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});