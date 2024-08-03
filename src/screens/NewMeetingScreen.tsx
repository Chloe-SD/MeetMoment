// sec/screens/NewMeetingScreen.tsx
import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  View,
  Alert,
} from 'react-native';
import {Meeting, Participant, Day, TimeBlock} from '../types';
import MeetingTitleInput from '../components/MeetingTitleInput';
import ParticipantInput from '../components/ParticipantInput';
import ParticipantList from '../components/ParticipantList';
import DateRangePicker from '../components/DateRangePicker';
import MeetingSchedule from '../components/MeetingSchedule';
import {useUser} from '../context/UserContext';
import {SaveMeetingToDatabase} from '../utils/DataManager';
import MeetingTitleValidation from '../components/MeetingTitleValidation';
import ParticipantValidation from '../components/ParticipantValidation';


const NewMeetingScreen = () => {
  const {user} = useUser();
  const [title, setTitle] = useState<string>('');
  const [titleInputTouched, setTitleInputTouched] = useState<boolean>(false);
  const [participant, setParticipant] = useState<string>('');
  const [participantList, setParticipantList] = useState<Participant[]>([]);
  const [participantInputTouched, setParticipantInputTouched] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  const addParticipant = (email: string) => {
    if (email == user?.email) {
      return;
    }
    setParticipantList([...participantList, { email, status: 'pending', participantAvailability: [] }]);
    setParticipantInputTouched(false);
  };

  const removeParticipant = (email: string) => {
    setParticipantList(participantList.filter(p => p.email !== email));
  };

  const selectTime = () => {
    if (!user) {
      return;
    }
    const currentUserEmail = user.email;
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      creatorEmail: currentUserEmail,
      participants: participantList,
      days: generateDays(startDate, endDate),
      title,
      status: 'pending',
    };

    setMeeting(newMeeting);
  };

  const saveMeetingToDB = async (): Promise<boolean> => {
    if (!meeting || !user) return false;
    const meetingToSave: Meeting = {
      id: meeting.id,
      creatorEmail: meeting.creatorEmail,
      participants: [...participantList, {email: meeting.creatorEmail, status: "confirmed", participantAvailability: meeting.days}],
      days: meeting.days,
      title: title,
      status: 'pending',
    }
    try {
      await SaveMeetingToDatabase(meetingToSave);
      console.log('Meeting saved successfully!');
      return true;
    } catch (error) {
      console.error('Error saving meeting:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    const success = await saveMeetingToDB();
    if (success) {
      Alert.alert(
        "Success",
        "Meeting saved successfully!",
        [
          { text: "OK", onPress: () => {
            refreshPage(); // Clear the state
          }}
        ]
      );
    } else {
      Alert.alert("Error", "Failed to save meeting. Please try again.");
    }
  };

  const refreshPage = () => {
      setTitle('');
      setParticipantList([]);
      setStartDate(new Date());
      setEndDate(new Date());
      setMeeting(null);
      setTitleInputTouched(false);
      setParticipantInputTouched(false);
  }

  const generateTimeBlocks = (): TimeBlock[] => {
    let blocks: TimeBlock[] = [];
    const startHour = 7;
    const endHour = 20; // Up to but not including 20:00
  
    for (let hour = startHour; hour < endHour; hour++) {
      const start = `${hour.toString().padStart(2, '0')}:00`;
      const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
  
      blocks.push({
        start,
        end,
        available: false,
        selectable: true,
      });
    }
  
    return blocks;
  };

  const generateDays = (start: Date, end: Date): Day[] => {
    let days: Day[] = [];
    let current = new Date(start);
  
    while (current <= end) {
      const dateStr = current.toDateString(); // YYYY-MM-DD format
      days.push({
        date: dateStr,
        blocks: generateTimeBlocks(),
      });
      current.setDate(current.getDate() + 1);
    }
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
    {type: 'selectTimeButton', id: 'selectTimeButton'},
    {type: 'meeting', id: 'meeting'},
  ];

  const renderItem = ({item}: {item: any}) => {
    switch (item.type) {
      case 'title':
        return (
          <View style={styles.topContainer}>
            <Text style={styles.title}>New Meeting</Text>
            <Pressable style={styles.clearButton}
            onPress={() => refreshPage()}>
              <Text style={styles.text}>Clear Form</Text>
            </Pressable>
          </View>
        );
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
        return (
          <ParticipantInput
            disabled={
              !validateNotEmpty(participant) ||
              !validateEmailFormat(participant)
            }
            onAddParticipant={addParticipant}
            participantEmail={participant}
            onChange={setParticipant}
            onFocus={() => setParticipantInputTouched(true)}
          />
        );
      case 'participantValidation':
        return (
          <ParticipantValidation
            isEmpty={!validateNotEmpty(participant) && participantInputTouched}
            isEmail={
              !validateEmailFormat(participant) && participantInputTouched
            }
            hasParticipants={
              validateParticipantListNotEmpty() || !participantInputTouched
            }
          />
        );
      case 'participantList':
        return (
          <ParticipantList
            participants={participantList}
            onRemoveParticipant={removeParticipant}
          />
        );

      case 'dateRangePicker':
        return (
        <View>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </View>
          
        );
      case 'selectTimeButton':
        return (
          <Pressable
            style={
              !validateSelectedTime() ? styles.disabledButton : styles.button
            }
            disabled={!validateSelectedTime()}
            onPress={selectTime}>
            <Text style={styles.text}>Select Time</Text>
          </Pressable>
        );
      case 'meeting':
        return meeting ? (
          <MeetingSchedule
            shouldDisableSaveButton={shouldDisableSaveButton()}
            meeting={meeting}
            onBlockToggle={handleBlockToggle}
            onSaveMeeting={handleSubmit}
          />
        ) : null;
      default:
        return null;
    }
  };

  function validateNotEmpty(string: string): boolean {
    return string !== '';
  }

  function validateEmailFormat(string: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
    const matchesArray = string.match(regex);
    // if there are no matches then false
    // if there is a match then true
    const emailIsGood = !!matchesArray; // !! to convert array to boolean
    return emailIsGood;
  }

  function validateSelectedTime(): boolean {
    return startDate <= endDate;
  }

  function validateParticipantListNotEmpty(): boolean {
    return participantList.length > 0;
  }

  function shouldDisableSaveButton(): boolean {
    return !validateNotEmpty(title) || !validateParticipantListNotEmpty();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#174e87',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  disabledButton: {
    backgroundColor: 'grey',
    width: 150,
    height: 50,
    padding: 3,
    marginTop: 30,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 'auto',
  },
  button: {
    backgroundColor: '#64A6E9',
    width: 120,
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
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#3dbae3',
    width: 120,
    height: 50,
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
});

export default NewMeetingScreen;
