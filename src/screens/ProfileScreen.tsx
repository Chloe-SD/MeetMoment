// src/screens/ProfileScreen.tsx
import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useUser} from '../context/UserContext';
import {UpdateUserName} from '../utils/DataManager';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const {user, setUser} = useUser();
  const [newName, setNewName] = useState(user?.name || '');

  const handleLogout = () => {
    auth().signOut();
    setUser(null);
  };

  const handleUpdateName = async () => {
    if (!user) return;
    try {
      await UpdateUserName(user.id, newName);
      setUser({...user, name: newName});
      Alert.alert('Success', 'Name updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update name. Please try again.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Enter new name"
      />
      <Pressable style={styles.updateButton} onPress={handleUpdateName}>
        <Text style={styles.buttonText}>Update Name</Text>
      </Pressable>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#174e87',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#3D90E3',
    width: 150,
    height: 50,
    padding: 3,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  logoutButton: {
    backgroundColor: '#3D90E3',
    width: 100,
    height: 50,
    padding: 3,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProfileScreen;