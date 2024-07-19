// DateRangePicker.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }: { startDate: Date, endDate: Date, setStartDate: (date: Date) => void, setEndDate: (date: Date) => void }) => {
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  const showDatePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setShowStartPicker(true);
    } else {
      setShowEndPicker(true);
    }
  };

  const onChangeDate = (setDate: (date: Date) => void, setShowPicker: (show: boolean) => void) => 
    (event: any, selectedDate?: Date) => {
      setShowPicker(false);
      if (selectedDate) {
        console.log('Date selected:', selectedDate.toISOString());
        setDate(selectedDate);
      }
    };

  return (
    <View>
      <View style={styles.datePickerContainer}>
        <Button title="Select Start Date" onPress={() => showDatePicker('start')} />
        <Text>{startDate.toDateString()}</Text>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeDate(setStartDate, setShowStartPicker)}
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
            onChange={onChangeDate(setEndDate, setShowEndPicker)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 16,
  },
});

export default DateRangePicker;