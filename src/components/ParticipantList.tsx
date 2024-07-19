// ParticipantList.tsx
import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Participant } from '../types';

const ParticipantList = ({ participants, onRemoveParticipant }: { participants: Participant[], onRemoveParticipant: (email: string) => void }) => (
  <FlatList
    data={participants}
    keyExtractor={(item) => item.email}
    renderItem={({ item }) => (
      <View style={styles.participantItem}>
        <Text>{item.email}</Text>
        <Button title="Remove" onPress={() => onRemoveParticipant(item.email)} />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  participantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default ParticipantList;