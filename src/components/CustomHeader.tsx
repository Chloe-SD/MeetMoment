import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = ({ username }: { username: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>MeetMoment</Text>
      <Text style={styles.greeting}>Hi, {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  appName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  greeting: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CustomHeader;