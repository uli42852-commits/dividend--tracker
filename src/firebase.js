import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase 프로젝트: dividend-tracker
const firebaseConfig = {
  apiKey: 'AIzaSyABSXniIF_7zX0bl4Q1qNHpqegb2xQ6zv4',
  authDomain: 'dividend-tracker-a8f75.firebaseapp.com',
  projectId: 'dividend-tracker-a8f75',
  storageBucket: 'dividend-tracker-a8f75.firebasestorage.app',
  messagingSenderId: '359188673847',
  appId: '1:359188673847:web:e3bfe8e77a6e166493d6b2',
  measurementId: 'G-G4DZ9T02J3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
