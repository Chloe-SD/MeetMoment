// MeetingTitleInput.tsx
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const MeetingTitleInput = ({
  title,
  setTitle,
  onFocus,
}: {
  title: string;
  setTitle: (title: string) => void;
  onFocus: () => void;
}) => (
  <View>
    <TextInput
      style={styles.input}
      placeholder="Meeting Title"
      value={title}
      onChangeText={setTitle}
      onFocus={onFocus}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 2,
    paddingHorizontal: 8,
    fontSize: 15,
  },
});

export default MeetingTitleInput;
