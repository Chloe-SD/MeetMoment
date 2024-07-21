// src/utils/DataManager.ts
import { firestore } from '../firebase';
import { Meeting, User } from '../types';
import { useUser } from '../context/UserContext';

export class DataManager {
  static async fetchMeetings(): Promise<Meeting[]> {
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

  static async deleteMeeting(id: string): Promise<void> {
    try {
      await firestore.collection('meetings').doc(id).delete();
    } catch (error) {
      console.error("Error deleting meeting:", error);
      throw error;
    }
  }

  static async saveMeetingToDatabase(meeting: Meeting): Promise<void> {
    try {
      await firestore.collection('meetings').add(meeting);
      console.log('Meeting saved successfully!');
    } catch (error) {
      console.error('Error saving meeting:', error);
      throw error;
    }
  }

  static async createUserDocument(user: User): Promise<void> {
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

  static async updateUserName(userId: string, newName: string): Promise<void> {
    try {
      await firestore.collection('users').doc(userId).update({ name: newName });
      console.log('User name updated successfully!');
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  }

  static async fetchUserData(userId: string): Promise<User> {
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
}