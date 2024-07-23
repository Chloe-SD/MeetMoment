import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyC7Iplg2z1voBqbKnDg3tpf625U1UnixeY',
  authDomain: 'meet-moment-e2280.firebaseapp.com',
  projectId: 'meet-moment-e2280',
  storageBucket: 'meet-moment-e2280.appspot.com',
  messagingSenderId: '343181070279',
  appId: '1:343181070279:web:a88d745b525ee559f653e2',
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firebase, firestore };
