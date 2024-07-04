/**
 * MeetMoment React Native app for Android
 * 
 *
 * 
 */

import React from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';



function App(): React.JSX.Element {

  return (

    <SafeAreaView>
      <ScrollView>
        
        
        <View style={styles.sectionContainer}>
          
          
          <HomeScreen/>
          <ProfileScreen/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  customImage: {
    width: 350,
    height: 350
  },
});

export default App;
