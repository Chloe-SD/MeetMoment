// src/screens/MeetingView.tsx
import React, { useState, useEffect } from 'react';
import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Alert, Pressable } from "react-native";
import { Meeting, Day, Participant } from "../types";
import TimeBlockSelector from "../components/TimeBlockSelector";
import { useUser } from '../context/UserContext';
import { UpdateMeeting } from '../utils/DataManager';

export default function MeetingView({ meeting, onClose }: { meeting: Meeting; onClose: () => void }) {
  const { user } = useUser();
  const [localDays, setLocalDays] = useState<Day[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
     //const isCreator = meeting.creatorEmail === user.email;
      //const userParticipant = meeting.participants.find(p => p.email === user.email);
      const userDays =  meeting.days;

      const initializedDays = userDays.map(day => ({
        ...day,
        blocks: day.blocks.map(block => ({
          ...block,
          selectable: meeting.days.find(d => d.date === day.date)?.blocks.find(b => b.start === block.start)?.available || false,
          available: false // start with all blocks unselected
        }))
      }));

      setLocalDays(initializedDays);
    }
    setIsLoading(false);
  }, [user, meeting]);

  const handleBlockToggle = (dayIndex: number, blockIndex: number) => {
    setLocalDays(prevDays => {
      const newDays = [...prevDays];
      const block = newDays[dayIndex].blocks[blockIndex];
      if (block.selectable) {
        block.available = !block.available;
      }
      return newDays;
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit availability.');
      return;
    }

    try {
      const updatedParticipants: Participant[] = meeting.participants.map(p =>
        p.email === user.email
          ? { ...p, status: 'confirmed' as 'confirmed', participantAvailability: localDays }
          : p
      );

      const updatedMeeting: Meeting = {
        ...meeting,
        participants: updatedParticipants,
      };
      await UpdateMeeting(updatedMeeting);
      Alert.alert('Success', 'Your availability has been submitted.');
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.meetingTitle}>Meeting Title: {meeting.title}</Text>
        <TimeBlockSelector
          days={localDays}
          onBlockToggle={handleBlockToggle}
        />
        <Pressable style={styles.submitButton}onPress={handleSubmit}>
          <Text style={styles.text}>Submit Availability</Text>
        </Pressable>
        <Pressable style={styles.backButton} onPress={onClose}>
        <Text style={styles.text}>BACK</Text>
        </Pressable>
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
    color: '#174e87',
    fontSize: 24, 
    marginBottom: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#3D90E3',
    width: 180,
    height: 50,
    padding: 3,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  backButton: {
    backgroundColor: '#2a649e',
    width: 80,
    height: 50,
    padding: 3,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
