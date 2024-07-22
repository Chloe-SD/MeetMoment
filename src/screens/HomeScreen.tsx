import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useUser } from '../context/UserContext';



const HomeScreen = () => {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Welcome to Donald's MeetMoment App! cb</Text>
        </View>
      
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f7ff',
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionTitle: {
        color: '#3D90E3',
        fontSize: 24,
        fontWeight: '600',
    },
    customImage: {
        width: 350,
        height: 350
    },
  });
  
  export default HomeScreen;