// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from '../context/UserContext';
import { FetchMeetings, DeleteMeeting } from '../utils/DataManager';
import { Meeting } from '../types';
import MeetingView from './MeetingView';
import ConfirmedMeetingView from './ConfirmedMeetingView';

const HomeScreen = () => {
    const { user } = useUser();
    const [searchText, setSearchText] = useState('');
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            const fetchedMeetings = await FetchMeetings();
            const filteredMeetings = fetchedMeetings.filter(meeting => 
              (meeting.participants.some(participant => 
                participant.email === user?.email && participant.status === 'confirmed'
              )) || (meeting.creatorEmail === user?.email && meeting.status === 'confirmed')
            );
            setMeetings(filteredMeetings);
          } catch (error) {
            Alert.alert("Error", "Failed to load meetings. Please try again.");
          }
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            "Delete Meeting",
            "Are you sure you want to delete this meeting?",
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: async () => {
                    try {
                        await DeleteMeeting(id);
                        setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.id !== id));
                    } catch (error) {
                        Alert.alert("Error", "Failed to delete meeting. Please try again.");
                    }
                }}
            ]
        );
    };

    const filteredMeetings = meetings.filter(meeting => 
        meeting.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleCloseMeetingView = () => {
        setSelectedMeeting(null);
    };

    const handleSelectMeeting = (meeting: Meeting) => () => {
        setSelectedMeeting(meeting);  
      };

    return !selectedMeeting? (
        <View style={styles.container}>
            <TextInput style={styles.searchBar}
                placeholder="Search"  value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={filteredMeetings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => ( 
                    <TouchableOpacity style={styles.meetingItem} onPress={handleSelectMeeting(item)}>
                        <View style={styles.meetingText}>
                            <Text style={styles.meetingTitle}>{item.title}</Text>
                            <Text style={styles.meetingCreator}>created by {item.creatorEmail}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={styles.deleteButton}>✖</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    ) : (
        <ConfirmedMeetingView meeting={selectedMeeting} onClose={handleCloseMeetingView} />
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16
    },
    meetingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8
    },
    meetingText: {
        flex: 1
    },
    meetingTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    meetingCreator: {
        fontSize: 14,
        color: '#666'
    },
    deleteButton: {
        fontSize: 18,
        color: 'red',
        marginLeft: 16
    }
});

export default HomeScreen;