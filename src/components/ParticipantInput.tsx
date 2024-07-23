// ParticipantInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';

const ParticipantInput = ({ onAddParticipant }: { onAddParticipant: (email: string) => void }) => {
  const [newEmail, setNewEmail] = useState<string>('');

  const handleAddParticipant = () => {
    if (newEmail && newEmail.includes('@')) {
      onAddParticipant(newEmail.trim());
      setNewEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add Participant Email"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <Pressable style={styles.button} onPress={handleAddParticipant}>
        <Text style={styles.text}>ADD</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
    button: {
    backgroundColor: '#3D90E3', 
    width: 80,
    height: 50,
    padding: 3,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  }
});

export default ParticipantInput;