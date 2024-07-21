// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { useUser } from "../context/UserContext";
import { DataManager } from "../utils/DataManager";

const ProfileScreen = () => {
  const { user, setUser } = useUser();
  const [newName, setNewName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = async () => {
    if (!user) return;

    try {
      await DataManager.updateUserName(user.id, newName);
      setUser({ ...user, name: newName });
      setIsEditing(false);
      Alert.alert("Success", "Your name has been updated.");
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
      {isEditing ? (
        <View style={styles.editNameContainer}>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter new name"
          />
          <Button title="Save" onPress={handleSaveName} />
        </View>
      ) : (
        <View style={styles.nameContainer}>
          <Text style={styles.info}>Name: {user.name}</Text>
          <Button title="Edit" onPress={handleEditName} />
        </View>
      )}
      <Text style={styles.info}>Email: {user.email}</Text>
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
  },
  info: {
    fontSize: 18,
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  editNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
  },
});

export default ProfileScreen;