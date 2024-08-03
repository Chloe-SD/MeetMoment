// DateRangePicker.tsx
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}) => {
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  const showDatePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setShowStartPicker(true);
    } else {
      setShowEndPicker(true);
    }
  };

  const onChangeDate =
    (setDate: (date: Date) => void, setShowPicker: (show: boolean) => void) =>
    (event: any, selectedDate?: Date) => {
      setShowPicker(false);
      if (selectedDate) {
        console.log('Date selected:', selectedDate.toISOString());
        setDate(selectedDate);
      }
    };

  
    return (
      <View style={styles.datePickerContainer}>
        <View>
          <Pressable
            style={styles.startButton}
            onPress={() => showDatePicker('start')}>
            <Text style={styles.buttonText}>Start Date</Text>
          </Pressable>
  
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
          {showStartPicker && (
            <DateTimePicker
              minimumDate={new Date()}
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeDate(setStartDate, setShowStartPicker)}
            />
          )}
        </View>
        <View>
          <Pressable
            style={styles.endButton}
            onPress={() => showDatePicker('end')}>
            <Text style={styles.buttonText}>End Date</Text>
          </Pressable>
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
          {showEndPicker && (
            <DateTimePicker
              minimumDate={startDate}
              maximumDate={
                new Date(startDate.getTime() + 24 * 60 * 60 * 1000 * 10)
              }
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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  
    startButton: {
      backgroundColor: '#3D90E3',
      width: 100,
      height: 50,
      padding: 3,
      marginTop: 30,
      justifyContent: 'space-evenly',
      borderRadius: 5,
    },
    endButton: {
      backgroundColor: '#3D90E3',
      width: 100,
      height: 50,
      padding: 3,
      marginTop: 30,
      borderRadius: 5,
      justifyContent: 'space-evenly',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
    dateText: {
      fontSize: 14,
      textAlign: 'center',
      justifyContent: 'center',
    },
  });
  
  export default DateRangePicker;