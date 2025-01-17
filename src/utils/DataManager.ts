// src/utils/DataManager.ts
import { firestore } from '../firebase';
import { Meeting, User } from '../types';

export async function FetchMeetings(): Promise<Meeting[]> {
  try {
    const meetingsSnapshot = await firestore.collection('meetings').get();
    return meetingsSnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || 'Untitled Meeting',
      creatorEmail: doc.data().creatorEmail || 'Unknown',
      participants: doc.data().participants || [],
      days: doc.data().days || [],
      status: doc.data().status || 'pending'
    } as Meeting));
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw error;
  }
}

export async function DeleteMeeting(id: string): Promise<void> {
  try {
    await firestore.collection('meetings').doc(id).delete();
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw error;
  }
}

export async function RemoveParticipant(meetingId: string, email: string): Promise<void> {
  try {
    const meetingRef = firestore.collection('meetings').doc(meetingId);
    const meetingDoc = await meetingRef.get();
    if (meetingDoc.exists) {
      const data = meetingDoc.data();
      const participants = data?.participants || [];
      const participantAvailability = data?.participantAvailability || {};
      // Remove the participant from the participants array
      const updatedParticipants = participants.filter((participant: { email: string }) => participant.email !== email);
      // Remove the participant's availability
      const { [email]: _, ...updatedParticipantAvailability } = participantAvailability;
      // Update the meeting document with the new participants and participantAvailability
      await meetingRef.update({ 
        participants: updatedParticipants,
        participantAvailability: updatedParticipantAvailability
      });
    }
  } catch (error) {
    console.error("Error removing participant from meeting:", error);
    throw error;
  }
}

export async function SaveMeetingToDatabase(meeting: Meeting): Promise<void> {
  try {
    await firestore.collection('meetings').add(meeting);
    console.log('Meeting saved successfully!');
  } catch (error) {
    console.error('Error saving meeting:', error);
    throw error;
  }
}

export async function UpdateMeeting(meeting: Meeting): Promise<void> {
  try {
    await firestore.collection('meetings').doc(meeting.id).update(meeting);
    console.log('Meeting updated successfully!');
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw error;
  }
}

export async function CreateUserDocument(user: User): Promise<void> {
  try {
    const userRef = firestore.collection('users').doc(user.id);
    await userRef.set({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

export async function UpdateUserName(userId: string, newName: string): Promise<void> {
  try {
    await firestore.collection('users').doc(userId).update({ name: newName });
    console.log('User name updated successfully!');
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
}

export async function FetchUserData(userId: string): Promise<User> {
  try {
    const userDoc = await firestore.collection('users').doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data() as User;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
