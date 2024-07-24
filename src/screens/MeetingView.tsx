// src/screens/MeetingView.tsx
import { Button, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Meeting } from "../types";
import TimeBlockSelector from "../components/TimeBlockSelector";


export default function MeetingView( 
    {meeting, onClose}:{meeting: Meeting, onClose: () => void},  
) {


    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.meetingTitle}>Meeting Title: {meeting.title}</Text>
            <TimeBlockSelector days={meeting.days} />
            <Button title="Back" onPress={onClose} />
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      safeArea: {
        flex: 1,
      },
      scrollContainer: {
        padding: 16,
      },
      meetingTitle: {
        fontSize: 18,
        marginBottom: 20,
      },
    });