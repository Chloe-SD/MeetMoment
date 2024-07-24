// MeetingSchedule.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Meeting } from '../types';
import TimeBlockSelector from './TimeBlockSelector';
import { useUser } from '../context/UserContext';

interface MeetingScheduleProps {
  meeting: Meeting;
  onBlockToggle: (dayIndex: number, blockIndex: number) => void;
  onSaveMeeting: () => void;
}

const MeetingSchedule: React.FC<MeetingScheduleProps> = ({ meeting, onBlockToggle, onSaveMeeting }) => {
  const { user } = useUser();
  const isCreator = user?.email === meeting.creatorEmail;

  return (
    <View>
      <Text style={styles.title}>Meeting Created</Text>
      <TimeBlockSelector 
        days={meeting.days} 
        onBlockToggle={onBlockToggle}
        isCreator={isCreator}
        creatorDays={meeting.days}
      />
      <Button title={isCreator ? "Save Meeting" : "Submit Availability"} onPress={onSaveMeeting} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 16,
  },
});

export default MeetingSchedule;