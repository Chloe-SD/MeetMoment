// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useUser } from "../context/UserContext";
import { DataManager } from "../utils/DataManager";
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const { user, setUser } = useUser();
  const [newName, setNewName] = useState(user?.name || '');
    
  const handleLogout = () => {
    auth().signOut();
    setUser(null);
  };

  const handleUpdateName = async () => {
    if (!user) return;
    try {
      await DataManager.updateUserName(user.id, newName);
      setUser({ ...user, name: newName });
      Alert.alert("Success", "Name updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update name. Please try again.");
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
      <Button title="Update Name" onPress={handleUpdateName} />
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
};
  
  const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    container: {
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
  });
  
  export default ProfileScreen;