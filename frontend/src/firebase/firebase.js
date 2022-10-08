import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: 'chat-a0c6e.appspot.com',
  messagingSenderId: '364530455655',
  appId: process.env.REACT_APP_ID,
  measurementId: 'G-TR8QZXF2R9',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
