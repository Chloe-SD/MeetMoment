// ParticipantInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUser } from '../context/UserContext';

const ParticipantInput = ({ onAddParticipant }: { onAddParticipant: (email: string) => void }) => {
  const { user } = useUser();
  const [newEmail, setNewEmail] = useState<string>('');

  const handleAddParticipant = () => {
    if (newEmail && newEmail == user?.email){
      Alert.alert("You cannot add yourself");
      setNewEmail('');
    }
    if (newEmail && newEmail.includes('@')) {
      onAddParticipant(newEmail.trim());
      setNewEmail('');
    } else {
      Alert.alert("Please enter a valid email");
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