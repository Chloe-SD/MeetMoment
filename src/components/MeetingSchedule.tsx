// MeetingSchedule.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Meeting } from '../types';
import TimeBlockSelector from './TimeBlockSelector';

const MeetingSchedule = ({ meeting, onBlockToggle, onSaveMeeting }: { meeting: Meeting, onBlockToggle: (dayIndex: number, blockIndex: number) => void, onSaveMeeting: () => void }) => (
  <View>
    <Text style={styles.title}>Meeting Created</Text>
    <TimeBlockSelector days={meeting.days} onBlockToggle={onBlockToggle} />
    <Button title="Save Meeting" onPress={onSaveMeeting} />
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 16,
  },
});

export default MeetingSchedule;