/**
 * MeetMoment React Native app for Android
 * 
 *
 * 
 */

// Import Dependencies
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// Import Views (Screens) and Object types
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import LoginScreen from './src/LoginScreen';
import NewMeetingScreen from './src/NewMeetingScreen';
import RequestsScreen from './src/Requests';
import { UserProvider, useUser } from './src/context/UserContext';


const Tab = createBottomTabNavigator();

const App = (): React.JSX.Element => {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

const AppNavigator = () => {

  const { user } = useUser();
  

  return (user ? (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New Meeting" component={NewMeetingScreen} />
        <Tab.Screen name="Requests" component={RequestsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    ) : (
      <LoginScreen />
    )
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
