import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomHeader = ({username}: {username: string}) => {
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
    backgroundColor: '#FFFFFF',
  },
  appName: {
    color: '#3D90E3',
    fontSize: 24,
    fontFamily: 'Andale Mono',
    fontWeight: 'bold',
  },
  greeting: {
    color: '#3D90E3',
    fontSize: 16,
  },
});

export default CustomHeader;