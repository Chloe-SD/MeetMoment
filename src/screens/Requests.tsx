import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Button, Modal } from 'react-native';

// Define a type for the meeting items
type Meeting = {
  id: string;
  title: string;
  creator: string;
  date: string;
  time: string;
};

// Sample meeting data
const meetings: Meeting[] = [
  { id: '1', title: 'M1', creator: 'JaeEun', date: 'Agu 5, 2024', time: '11:00-13:00' },
  { id: '2', title: 'WOW MEEEEEEEEEEEETTTTTTTINGSSSSSSS', creator: 'JamesSSSSSSSSSSS', date: 'Agu 12, 2024', time: '12:00-14:00' },
];

const RequestsScreen = () => {
  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleMeetingClick = () => {
    setModalVisible(true);
  };

  const renderMeetingItem = ({ item }: { item: Meeting }) => (
    <TouchableOpacity style={styles.meetingItem} onPress={handleMeetingClick} key={item.id}>
      <View style={styles.meetingInfo}>
        <Text style={styles.meetingTitle}>{item.title}</Text>
        <Text style={styles.meetingCreator}>created by {item.creator} {item.date}. {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meet Moment</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileText}>
          <Text style={styles.greeting}>Hi, Chloe</Text>
        </View>
      </View>
      <Text style={styles.title}>Chloe's Requests</Text>
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
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
    backgroundColor: '#f0f0f0',
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
});

export default RequestsScreen;
