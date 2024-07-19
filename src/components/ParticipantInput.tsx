// ParticipantInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
      <Button title="Add" onPress={handleAddParticipant} />
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
});

export default ParticipantInput;