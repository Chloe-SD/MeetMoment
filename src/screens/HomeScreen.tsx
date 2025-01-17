// src/screens/HomeScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../context/UserContext';
import { FetchMeetings, DeleteMeeting, RemoveParticipant } from '../utils/DataManager';
import {Meeting} from '../types';
import ConfirmedMeetingView from './ConfirmedMeetingView';

const HomeScreen = () => {
  const {user} = useUser();
  const [searchText, setSearchText] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    if (!user){return};
    try {
      const fetchedMeetings = await FetchMeetings();
      const filteredMeetings = fetchedMeetings.filter(
        meeting =>
          meeting.participants.some(
            participant =>
              participant.email === user?.email &&
              participant.status === 'confirmed',
          ) ||
          (meeting.creatorEmail === user?.email &&
            meeting.status === 'confirmed'),
      );
      setMeetings(filteredMeetings);
    } catch (error) {
      Alert.alert('Error', 'Failed to load meetings. Please try again.');
    }
  };

  const handleDelete = async (meeting: Meeting) => {
    if (!user?.email) {
        Alert.alert("Error", "User email is not defined.");
        return;
    }
    try {
      if (meeting.creatorEmail === user.email) {
        
        Alert.alert(
          "Delete Meeting",
          "Are you sure you want to delete this meeting?",
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: async () => {
                  await DeleteMeeting(meeting.id);
                  setMeetings(prevMeetings => prevMeetings.filter(m => m.id !== meeting.id));
                }}
            ]
        );
          
      } else {
        Alert.alert(
          "Leave Meeting",
          "Are you sure you want to remove yourself from this meeting?",
            [
                {text: "Cancel", style: "cancel"},
                { text: "OK", onPress: async () => {
                  await RemoveParticipant(meeting.id, user.email);
                  setMeetings(prevMeetings => prevMeetings.filter(m => m.id !== meeting.id));
                }}
            ]
        );
          
      }
    } catch (error) {
        Alert.alert("Error", "Failed to delete meeting. Please try again.");
    }
    
};

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleCloseMeetingView = () => {
    setSelectedMeeting(null);
  };

  const handleSelectMeeting = (meeting: Meeting) => () => {
    setSelectedMeeting(meeting);
  };

  return !selectedMeeting ? (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      {meetings.length == 0? (
        <View>
          <Text>You Have no meetings</Text>
        </View>
      ):(
        <FlatList
        data={filteredMeetings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.meetingItem}
            onPress={handleSelectMeeting(item)}>
            <View style={styles.meetingText}>
              <Text style={styles.meetingTitle}>{item.title}</Text>
              <Text style={styles.meetingCreator}>
                created by {item.creatorEmail}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item)}>
              <Text style={styles.deleteButton}>✖</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />)}
    </View>
  ) : (
    <ConfirmedMeetingView meeting={selectedMeeting} onClose={handleCloseMeetingView} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 16,
  },
  meetingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf4fc',
    padding: 16,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  meetingText: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meetingCreator: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
    marginLeft: 16,
  },
});

export default HomeScreen;
