// src/screens/ProfileScreen.tsx
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useUser} from '../context/UserContext';
import {DataManager} from '../utils/DataManager';

const ProfileScreen = () => {
  const {user, setUser} = useUser();
  const [newName, setNewName] = useState(user?.name || '');

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateName = async () => {
    if (!user) return;
    try {
      await DataManager.updateUserName(user.id, newName);
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
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    //justifyContent: 'center',
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
