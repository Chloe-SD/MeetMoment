// ParticipantInput.tsx
import React from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';

const ParticipantInput = ({
  disabled,
  participantEmail,
  onChange,
  onAddParticipant,
  onFocus,
}: {
  disabled: boolean;
  participantEmail: string;
  onChange: (newEmail: string) => void;
  onAddParticipant: (email: string) => void;
  onFocus: () => void;
}) => {
  const handleAddParticipant = () => {
    if (participantEmail && participantEmail.includes('@')) {
      onAddParticipant(participantEmail.trim());
      onChange('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add Participant Email"
        value={participantEmail}
        onChangeText={onChange}
        onFocus={onFocus}
      />
      <Pressable
        disabled={disabled}
        style={disabled ? styles.disabledButton : styles.button}
        onPress={handleAddParticipant}>
        <Text style={styles.text}>ADD</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#3D90E3',
    width: 60,
    height: 50,
    padding: 3,
    borderRadius: 5,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'grey',
    width: 60,
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

export default ParticipantInput;