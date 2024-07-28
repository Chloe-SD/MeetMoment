// MeetingSchedule.tsx
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Meeting} from '../types';
import TimeBlockSelector from './TimeBlockSelector';

const MeetingSchedule = ({
  meeting,
  onBlockToggle,
  onSaveMeeting,
  shouldDisableSaveButton,
}: {
  meeting: Meeting;
  onBlockToggle: (dayIndex: number, blockIndex: number) => void;
  onSaveMeeting: () => void;
  shouldDisableSaveButton: boolean;
}) => (
  <View>
    <Text style={styles.title}>Meeting Created</Text>
    <TimeBlockSelector days={meeting.days} onBlockToggle={onBlockToggle} />
    <Pressable
      style={shouldDisableSaveButton ? styles.disabledButton : styles.button}
      disabled={shouldDisableSaveButton}
      onPress={onSaveMeeting}>
      <Text style={styles.text}>Save Meeting</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 16,
  },
  disabledButton: {
    backgroundColor: 'grey',
    width: 150,
    height: 50,
    padding: 3,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  button: {
    backgroundColor: '#3D90E3',
    width: 150,
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

export default MeetingSchedule;