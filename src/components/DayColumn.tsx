
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TimeBlock } from '../types';

interface DayColumnProps {
  date: string;
  blocks: TimeBlock[];
  onBlockToggle?: (blockIndex: number) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({ date, blocks, onBlockToggle }) => {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

  return (
    <View style={styles.container}>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      {blocks.map((block, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.block, block.available && styles.blockAvailable]}
          onPress={() => onBlockToggle && onBlockToggle(index)}
        >
          <Text style={styles.blockText}>{block.start}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  dayOfWeek: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  block: {
    padding: 8,
    width: 90,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
  },
  blockAvailable: {
    backgroundColor: '#4CAF50',
  },
  blockText: {
    fontSize: 16,
  },
});

export default DayColumn;
