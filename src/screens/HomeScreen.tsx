import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useUser } from '../context/UserContext';



const HomeScreen = () => {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Text style={styles.sectionTitle}>Welcome to Donald's MeetMoment App! cb</Text>
        </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    title: {
        fontSize: 24,
    },
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
    customImage: {
        width: 350,
        height: 350
    },
  });
  
  export default HomeScreen;