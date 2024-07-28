// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {User} from '../types';
import {useUser} from '../context/UserContext';
import {DataManager} from '../utils/DataManager';

const LoginScreen = () => {
  const {setUser} = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const userData = await DataManager.fetchUserData(firebaseUser.uid);
      setUser(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Login failed', error.message);
      } else {
        Alert.alert('An unknown error occurred');
      }
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const newUser: User = {
        id: firebaseUser.uid,
        name: name || 'User',
        email: firebaseUser.email ?? '',
      };
      await DataManager.createUserDocument(newUser);
      setUser(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Registration failed', error.message);
      } else {
        Alert.alert('An unknown error occurred');
      }
    }
  };

  const [loginPageChoice, setLoginPageChoice] = useState<
    'signup' | 'login' | ''
  >('');

  if (loginPageChoice === 'signup') {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Name (for registration)"
          value={name}
          onChangeText={setName}
        />

        <Pressable onPress={handleRegister} style={styles.signUpButton}>
          <Text style={styles.text}>SIGN UP</Text>
        </Pressable>

        <Pressable
          onPress={() => setLoginPageChoice('')}
          style={styles.backButton}>
          <Text style={styles.text}>BACK</Text>
        </Pressable>
      </View>
    );
  } else if (loginPageChoice === 'login') {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable onPress={handleLogin} style={styles.logInButton}>
          <Text style={styles.text}>LOG IN</Text>
        </Pressable>

        <Pressable
          onPress={() => setLoginPageChoice('')}
          style={styles.backButton}>
          <Text style={styles.text}>BACK</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/calendar.png')} />
        <Text style={styles.sectionTitle}>Meet Moment</Text>

        <Pressable
          onPress={() => setLoginPageChoice('login')}
          style={styles.logInButton}>
          <Text style={styles.text}>LOG IN</Text>
        </Pressable>

        <Pressable
          onPress={() => setLoginPageChoice('signup')}
          style={styles.signUpButton}>
          <Text style={styles.text}>SIGN UP</Text>
        </Pressable>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3D90E3',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  logInButton: {
    backgroundColor: '#3D90E3',
    width: 100,
    height: 50,
    padding: 3,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: '#3dbae3',
    width: 100,
    height: 50,
    padding: 3,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
  },

  backButton: {
    backgroundColor: '#2a649e',
    width: 100,
    height: 50,
    padding: 3,
    marginTop: 30,
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

export default LoginScreen;
