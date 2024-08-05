// src/components/TimeBlockSelector.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Day } from '../types';
import DayColumn from './DayColumn';

interface TimeBlockSelectorProps {
  days: Day[];
  onBlockToggle: (dayIndex: number, blockIndex: number) => void;
}

const TimeBlockSelector: React.FC<TimeBlockSelectorProps> = ({ days, onBlockToggle }) => {
  return (
    <FlatList style={styles.container}
      data={days}
      keyExtractor={(item) => item.date}
      renderItem={({ item, index }) => (
        <DayColumn
          date={item.date}
          blocks={item.blocks}
          onBlockToggle={(blockIndex) => onBlockToggle(index, blockIndex)}
        />
      )}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignSelf: 'center'
    
  },
});

export default TimeBlockSelector;
