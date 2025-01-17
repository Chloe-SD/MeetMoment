// src/screens/Requests.tsx
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  Modal,
  Alert,
} from 'react-native';
import {useUser} from '../context/UserContext';
import {FetchMeetings, RemoveParticipant} from '../utils/DataManager';
import {Meeting} from '../types';
import MeetingView from './MeetingView';

const RequestsScreen = () => {
  const {user} = useUser();
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const fetchedMeetings = await FetchMeetings();
      const filteredMeetings = fetchedMeetings.filter(meeting =>
        meeting.participants.some(
          participant =>
            participant.email === user?.email &&
            participant.status === 'pending',
        ),
      );
      setMeetings(filteredMeetings);
    } catch (error) {
      Alert.alert('Error', 'Failed to load meetings. Please try again.');
    }
  };

  const handleMeetingClick = (meeting: Meeting) => {
    // Handle meeting click, possibly open a detailed view
    setSelectedMeeting(meeting);
  };

  const handleDelete = (meeting: Meeting) => {
    if (!user) {
      return;
    }
    Alert.alert(
      'Leave Meeting',
      'Are you sure you want to remove yourself from this meeting?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: async () => {
            await RemoveParticipant(meeting.id, user.email);
            setMeetings(prevMeetings =>
              prevMeetings.filter(m => m.id !== meeting.id),
            );
          },
        },
      ],
    );
  };

  const renderMeetingItem = ({item}: {item: Meeting}) => (
    <TouchableOpacity
      style={styles.meetingItem}
      onPress={() => handleMeetingClick(item)}>
      <View style={styles.meetingInfo}>
        <Text style={styles.meetingTitle}>{item.title}</Text>
        <Text style={styles.meetingCreator}>
          created by {item.creatorEmail}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Text style={styles.deleteButton}>✖</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleCloseMeetingView = () => {
    setSelectedMeeting(null);
  };

  return !selectedMeeting ? (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name}'s Requests</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <TextInput
        style={styles.codeInput}
        placeholder="Enter Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <FlatList
        data={meetings}
        renderItem={renderMeetingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  ) : (
    <MeetingView meeting={selectedMeeting} onClose={handleCloseMeetingView} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#174e87',
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  codeInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  meetingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf4fc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meetingCreator: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
    marginLeft: 16,
  },
});

export default RequestsScreen;
