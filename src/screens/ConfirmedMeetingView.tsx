// src/components/ConfirmedMeetingView.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Meeting, Day, TimeBlock } from '../types';

interface ConfirmedMeetingViewProps {
  meeting: Meeting;
  onClose: () => void;
}

export default function ConfirmedMeetingView({ meeting, onClose }: ConfirmedMeetingViewProps) {
  const allResponded = meeting.participants?.every(p => p.status === 'confirmed') ?? false;
  const commonAvailability = getCommonAvailability(meeting);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meeting.title || 'Untitled Meeting'}</Text>
      <Text style={styles.status}>
        {allResponded ? 'All participants have responded' : 'Waiting for some participants to respond'}
      </Text>
      <Text style={styles.subtitle}>Participants:</Text>
      <FlatList
        data={meeting.participants || []}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <Text>{item.email}: {item.status}</Text>
        )}
      />
      <Text style={styles.subtitle}>Common Availability:</Text>
      {commonAvailability.length > 0 ? (
        <FlatList
          data={commonAvailability}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <Text>{item.date}: {item.blocks.filter(b => b.available).map(b => b.start).join(', ')}</Text>
          )}
        />
      ) : (
        <Text>No common availability found</Text>
      )}
      <Button title="Close" onPress={onClose} />
    </View>
  );
}

function getCommonAvailability(meeting: Meeting): Day[] {
  if (!meeting.participantAvailability) return [];

  const participantAvailabilities = Object.values(meeting.participantAvailability);
  if (participantAvailabilities.length === 0) return [];

  return participantAvailabilities[0].map((day, dayIndex) => ({
    date: day.date,
    blocks: day.blocks.map((block, blockIndex) => ({
      ...block,
      available: participantAvailabilities.every(
        pa => pa[dayIndex]?.blocks[blockIndex]?.available
      ),
    })),
  }));
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  status: { fontSize: 16, marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
});