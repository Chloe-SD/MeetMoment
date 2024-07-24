// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { User } from "../types";
import { useUser } from "../context/UserContext";
import { CreateUserDocument, FetchUserData } from "../utils/DataManager";

const LoginScreen = () => {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const firebaseUser = userCredential.user;
            const userData = await FetchUserData(firebaseUser.uid);
            setUser(userData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert("Login failed", error.message);
            } else {
                Alert.alert("An unknown error occurred");
            }
        }
    };

    const handleRegister = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const firebaseUser = userCredential.user;
            const newUser: User = { id: firebaseUser.uid, name: name || 'User', email: firebaseUser.email ?? '' };
            await CreateUserDocument(newUser);
            setUser(newUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert("Registration failed", error.message);
            } else {
                Alert.alert("An unknown error occurred");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Login Screen</Text>
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
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default LoginScreen;
