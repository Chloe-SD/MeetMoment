// sec/screens/NewMeetingScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import {Meeting, Participant, Day, TimeBlock} from '../types';
import MeetingTitleInput from '../components/MeetingTitleInput';
import ParticipantInput from '../components/ParticipantInput';
import ParticipantList from '../components/ParticipantList';
import DateRangePicker from '../components/DateRangePicker';
import MeetingSchedule from '../components/MeetingSchedule';
import {useUser} from '../context/UserContext';
import {DataManager} from '../utils/DataManager';
import MeetingTitleValidation from '../components/MeetingTitleValidation';
import ParticipantValidation from '../components/ParticipantValidation';

const NewMeetingScreen = () => {
  const {user} = useUser();
  const [title, setTitle] = useState<string>('');
  const [titleInputTouched, setTitleInputTouched] = useState<boolean>(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  const addParticipant = (email: string) => {
    if (email == user?.email) {
      return;
    }
    setParticipants([...participants, {email: email, status: 'pending'}]);
  };

  const removeParticipant = (email: string) => {
    setParticipants(participants.filter(p => p.email !== email));
  };

  const createMeeting = () => {
    if (!user) {
      return;
    }
    const currentUserEmail = user.email;
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      creatorEmail: currentUserEmail,
      participants,
      days: generateDays(startDate, endDate),
      title,
      status: 'pending',
    };
    setMeeting(newMeeting);
  };

  const saveMeetingToDB = async () => {
    if (!meeting || !user) return;
    const currentUserEmail = user.email;
    const meetingToSave: Meeting = {
      id: meeting.id,
      creatorEmail: currentUserEmail,
      participants: [
        ...participants,
        {email: currentUserEmail, status: 'confirmed'},
      ],
      days: meeting.days,
      title: title,
      status: 'pending',
    };
    try {
      await DataManager.saveMeetingToDatabase(meetingToSave);
      console.log('Meeting saved successfully!');
    } catch (error) {
      console.error('Error saving meeting:', error);
    }
  };

  const generateTimeBlocks = (date: string): TimeBlock[] => {
    let blocks: TimeBlock[] = [];
    let current = new Date(`${date}T07:00:00`); // Start at 7 AM
    const endTime = new Date(`${date}T20:00:00`); // End at 8 PM

    while (current < endTime) {
      const start = current.toTimeString().slice(0, 5);
      current.setHours(current.getHours() + 1);
      const end = current.toTimeString().slice(0, 5);

      blocks.push({
        start,
        end,
        available: false,
      });
    }

    return blocks;
  };

  const generateDays = (start: Date, end: Date): Day[] => {
    console.log('Start date received:', start.toISOString());
    console.log('End date received:', end.toISOString());

    let days: Day[] = [];

    // Create new Date objects set to midnight in local time
    let current = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    let endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    console.log('Adjusted start date:', current.toISOString());
    console.log('Adjusted end date:', endDate.toISOString());

    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      console.log('Adding date:', dateStr);
      days.push({
        date: dateStr,
        blocks: generateTimeBlocks(dateStr),
      });
      current.setDate(current.getDate() + 1);
    }

    console.log(
      'Generated days:',
      days.map(day => day.date),
    );

    return days;
  };

  const handleBlockToggle = (dayIndex: number, blockIndex: number) => {
    if (!meeting) return;
    const updatedMeeting = {...meeting};
    const block = updatedMeeting.days[dayIndex].blocks[blockIndex];
    block.available = !block.available;
    setMeeting(updatedMeeting);
  };

  const listData = [
    {type: 'title', id: 'title'},
    {type: 'titleInput', id: 'titleInput'},
    {type: 'titleValidation', id: 'titleValidation'},
    {type: 'participantInput', id: 'participantInput'},
    {type: 'participantValidation', id: 'participantValidation'},
    {type: 'participantList', id: 'participantList'},
    {type: 'dateRangePicker', id: 'dateRangePicker'},
    {type: 'createButton', id: 'createButton'},
    {type: 'meeting', id: 'meeting'},
  ];

  const renderItem = ({item}: {item: any}) => {
    switch (item.type) {
      case 'title':
        return <Text style={styles.title}>New Meeting</Text>;
      case 'titleInput':
        return (
          <MeetingTitleInput
            title={title}
            setTitle={setTitle}
            onFocus={() => setTitleInputTouched(true)}
          />
        );
      case 'titleValidation':
        return (
          <MeetingTitleValidation
            valid={validateNotEmpty(title) || !titleInputTouched}
          />
        );
      case 'participantInput':
        return <ParticipantInput onAddParticipant={addParticipant} />;
      case 'participantList':
        return (
          <ParticipantList
            participants={participants}
            onRemoveParticipant={removeParticipant}
          />
        );
      case 'participantValidation':
        return (
          <ParticipantValidation
            isEmpty={validateNotEmpty()}
            isEmail={false}
            hasParticipants={false}
          />
        );
      case 'dateRangePicker':
        return (
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        );
      case 'createButton':
        return (
          <Pressable style={styles.button} onPress={createMeeting}>
            <Text style={styles.text}>Create Meeting</Text>
          </Pressable>
        );
      case 'meeting':
        return meeting ? (
          <MeetingSchedule
            meeting={meeting}
            onBlockToggle={handleBlockToggle}
            onSaveMeeting={saveMeetingToDB}
          />
        ) : null;
      default:
        return null;
    }
  };

  function validateNotEmpty(string: string): boolean {
    return string !== '';
  }

  return (
    <View>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#174e87',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#3D90E3',
    width: 150,
    height: 50,
    padding: 3,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default NewMeetingScreen;
