// MeetingTitleInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const MeetingTitleInput = ({ title, setTitle }: { title: string, setTitle: (title: string) => void }) => (
  <View>
    <Text style={styles.title}>New Meeting</Text>
    <TextInput
      style={styles.input}
      placeholder="Meeting Title"
      value={title}
      onChangeText={setTitle}
    />
  </View>
);

const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
  });

  export default MeetingTitleInput;