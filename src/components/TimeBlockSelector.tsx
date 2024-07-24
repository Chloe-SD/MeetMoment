import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Day, TimeBlock } from '../types';
import DayColumn from './DayColumn';

interface TimeBlockSelectorProps {
  days: Day[];
  onBlockToggle?: (dayIndex: number, blockIndex: number) => void;
  isCreator: boolean;
  creatorDays: Day[];
}

const TimeBlockSelector: React.FC<TimeBlockSelectorProps> = ({ days, onBlockToggle, isCreator, creatorDays }) => {
  return (
    <FlatList
      data={days}
      keyExtractor={(item) => item.date}
      renderItem={({ item, index }) => (
        <DayColumn
          date={item.date}
          blocks={item.blocks}
          onBlockToggle={(blockIndex) => onBlockToggle && onBlockToggle(index, blockIndex)}
          isCreator={isCreator}
          creatorBlocks={creatorDays[index].blocks}
        />
      )}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default TimeBlockSelector;
