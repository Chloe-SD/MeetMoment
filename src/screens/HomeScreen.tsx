import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from '../context/UserContext';

const HomeScreen = () => {
    //const { user } = useUser();
    const [searchText, setSearchText] = useState('');
    const [meetings, setMeetings] = useState([
        { id: '1', title: 'Afternoon tea', creator: 'Jane' },
        { id: '2', title: 'OOP2 assignment', creator: 'Donald' },
        { id: '3', title: 'Mobile App group', creator: 'Jin' }
    ]);

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Meeting",
            "Are you sure you want to delete this meeting?",
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: () => setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.id !== id)) }
            ]
        );
    };

    const filteredMeetings = meetings.filter(meeting => 
        meeting.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput style={styles.searchBar}
                placeholder="Search"  value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={filteredMeetings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.meetingItem}>
                        <View style={styles.meetingText}>
                            <Text style={styles.meetingTitle}>{item.title}</Text>
                            <Text style={styles.meetingCreator}>created by {item.creator}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={styles.deleteButton}>✖</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
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
