/**
 * MeetMoment React Native app for Android
 *
 *
 *
 */

// Import Dependencies
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

// Import Views (Screens) and Object types
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import NewMeetingScreen from './src/screens/NewMeetingScreen';
import RequestsScreen from './src/screens/Requests';
import {UserProvider, useUser} from './src/context/UserContext';
import CustomHeader from './src/components/CustomHeader';

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
  const {user, setUser} = useUser();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUser({
          name: user.displayName ?? 'User',
          email: user.email ?? '',
          id: user.uid ?? '',
        });
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing, setUser]);

  if (initializing) return null; // Add a loading spinner or screen here if desired

  return user ? (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./src/assets/icons/home.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3D90E3' : '#77787C',
                }}
              />
            </View>
          ),
          header: () => <CustomHeader username={user?.name ?? 'Guest'} />,
          unmountOnBlur: true,
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        name="New Meeting"
        component={NewMeetingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./src/assets/icons/newmeeting.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3D90E3' : '#77787C',
                }}
              />
            </View>
          ),
          header: () => <CustomHeader username={user?.name ?? 'Guest'} />,
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./src/assets/icons/request.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#3D90E3' : '#77787C',
                }}
              />
            </View>
          ),
          header: () => <CustomHeader username={user?.name ?? 'Guest'} />,
          unmountOnBlur: true,
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('./src/assets/icons/profile.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#3D90E3' : '#77787C',
                }}
              />
            </View>
          ),
          header: () => <CustomHeader username={user?.name ?? 'Guest'} />,
        }}
      />
    </Tab.Navigator>
  ) : (
    <LoginScreen />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  customImage: {
    width: 350,
    height: 350,
  },
});

export default App;
