import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Schedule, Day, TimeBlock } from '../types';
import TimeBlockSelector from '../components/TimeBlockSelector';

const NewMeetingScreen = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  const generateTimeBlocks = (date: string): TimeBlock[] => {
    let blocks: TimeBlock[] = [];
    let current = new Date(`${date}T07:00:00`); // Start at 7 AM
    const endDateTime = new Date(`${date}T20:00:00`); // End at 8 PM
    while (current <= endDateTime) {
      const startTime = current.toTimeString().split(' ')[0].substring(0, 5);
      blocks.push({
        start: startTime,
        end: '', // End time is not displayed, so we leave it empty
        available: false,
      });
      current = new Date(current.getTime() + 60 * 60000); // 60-minute intervals
    }
    return blocks;
  };

  const generateDays = (startDate: string, endDate: string): Day[] => {
    let days: Day[] = [];
    let current = new Date(startDate);
    const end = new Date(endDate);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        blocks: generateTimeBlocks(dateStr),
      });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const createSchedule = (startDate: string, endDate: string) => {
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      creatorEmail: 'creator@example.com',
      emails: ['user1@example.com', 'user2@example.com'],
      days: generateDays(startDate, endDate),
    };
    setSchedule(newSchedule);
  };

  const handleDateRangeSelected = () => {
    createSchedule(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
  };

  const handleBlockToggle = (dayIndex: number, blockIndex: number) => {
    if (!schedule) return;
    const updatedSchedule = { ...schedule };
    const block = updatedSchedule.days[dayIndex].blocks[blockIndex];
    block.available = !block.available;
    setSchedule(updatedSchedule);
  };

  const showDatePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setShowStartPicker(true);
    } else {
      setShowEndPicker(true);
    }
  };

  const onChangeStart = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Meeting</Text>
      <View style={styles.datePickerContainer}>
        <Button title="Select Start Date" onPress={() => showDatePicker('start')} />
        <Text>{startDate.toDateString()}</Text>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStart}
          />
        )}
      </View>
      <View style={styles.datePickerContainer}>
        <Button title="Select End Date" onPress={() => showDatePicker('end')} />
        <Text>{endDate.toDateString()}</Text>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEnd}
          />
        )}
      </View>
      <Button title="Create Schedule" onPress={handleDateRangeSelected} />
      {schedule && (
        <View>
          <Text style={styles.scheduleTitle}>Schedule Created</Text>
          <TimeBlockSelector days={schedule.days} onBlockToggle={handleBlockToggle} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  scheduleTitle: {
    fontSize: 20,
    marginVertical: 16,
  },
});

export default NewMeetingScreen;
