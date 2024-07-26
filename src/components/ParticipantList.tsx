// ParticipantList.tsx
import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Participant} from '../types';

const ParticipantList = ({
  participants,
  onRemoveParticipant,
}: {
  participants: Participant[];
  onRemoveParticipant: (email: string) => void;
}) => (
  <FlatList
    data={participants}
    keyExtractor={item => item.email}
    renderItem={({item}) => (
      <View style={styles.participantItem}>
        <Text>{item.email}</Text>
        <Pressable
          style={styles.button}
          onPress={() => onRemoveParticipant(item.email)}>
          <Text style={styles.text}>Remove</Text>
        </Pressable>
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
  button: {
    backgroundColor: '#3D90E3',
    width: 80,
    height: 50,
    padding: 3,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ParticipantList;
