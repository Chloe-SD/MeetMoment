// src/components/ConfirmedMeetingView.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Modal, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Meeting, Day, Participant } from '../types';
import TimeBlockSelector from '../components/TimeBlockSelector';

interface ConfirmedMeetingViewProps {
  meeting: Meeting;
  onClose: () => void;
}

export default function ConfirmedMeetingView({ meeting, onClose }: ConfirmedMeetingViewProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const allResponded = meeting.participants?.every(p => p.status === 'confirmed') ?? false;
  
  const commonAvailability = useMemo(() => getCommonAvailability(meeting), [meeting]);

  const handleParticipantPress = (participant: Participant) => {
    setSelectedParticipant(participant);
  };

  const closeParticipantModal = () => {
    setSelectedParticipant(null);
  };

  const renderItem = ({ item }: { item: string }) => {
    switch (item) {
      case 'header':
        return (
          <>
            <Text style={styles.title}>{meeting.title || 'Untitled Meeting'}</Text>
            <Text style={styles.status}>
              {allResponded ? 'All participants have responded' : 'Waiting for some participants to respond'}
            </Text>
          </>
        );
      case 'commonAvailability':
        return (
          <>
            <Text style={styles.subtitle}>Common Availability:</Text>
            <View style={styles.timeBlockContainer}>
              <TimeBlockSelector days={commonAvailability} onBlockToggle={() => {}} />
            </View>
          </>
        );
      case 'participants':
        return (
          <>
            <Text style={styles.subtitle}>Participants:</Text>
            {meeting.participants?.map((participant) => (
              <TouchableOpacity 
                key={participant.email} 
                onPress={() => handleParticipantPress(participant)} 
                style={styles.participantItem}
              >
                <Text style={styles.participantText}>{participant.email}: {participant.status}</Text>
              </TouchableOpacity>
            ))}
          </>
        );
      case 'footer':
        return (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.text}>CLOSE</Text>
            </Pressable>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={['header', 'commonAvailability', 'participants', 'footer']}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.container}
      />

      <Modal
        visible={selectedParticipant !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeParticipantModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedParticipant?.email}'s Availability</Text>
            <TimeBlockSelector 
              days={selectedParticipant?.participantAvailability || []} 
              onBlockToggle={() => {}} 
            />
            <Pressable style={styles.button} onPress={closeParticipantModal}>
              <Text style={styles.text}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function getCommonAvailability(meeting: Meeting): Day[] {
  // Copy the participant list - filtering out anyone who has NOT confirmed their availability
  const confirmedParticipants = meeting.participants.filter(p => p.status === 'confirmed');
  // return nothing is no one is confirmed
  if (confirmedParticipants.length === 0) return [];
  // get the availabilities from each CONFIRMED participant
  const participantAvailabilities = confirmedParticipants
    .map(p => p.participantAvailability)
    .filter(pa => pa !== undefined && pa.length > 0);
  // again return none if no one has availabilities defined
  if (participantAvailabilities.length === 0) return [];
  // Create a brand new Days array. // copying the blocks from the original
  return participantAvailabilities[0].map((day, dayIndex) => ({
    date: day.date,
    blocks: day.blocks.map((block, blockIndex) => ({
      ...block, // unpack eac block object and ONLY set it TRUE if EVER PARTICIPANT
      //also had this block selected as TRUE (available)
      available: participantAvailabilities.every(
        pa => pa[dayIndex]?.blocks[blockIndex]?.available
      ),
      
    })),
  }));
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#174e87'
  },
  status: {
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  timeBlockContainer: {
    height: 670, // Adjust this value as needed
  },
  participantItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  participantText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    alignItems: 'center',
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3D90E3',
    width: 80,
    height: 50,
    padding: 3,
    marginTop: 30,
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
