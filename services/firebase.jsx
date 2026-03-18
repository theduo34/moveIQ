import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




const firebaseConfig = {
  apiKey: "AIzaSyAJAW055JfqxK25RuLljdrIP-Hzjef-Bdk",
  authDomain: "moveiq-2b788.firebaseapp.com",
  projectId: "moveiq-2b788",
  storageBucket: "moveiq-2b788.firebasestorage.app",
  messagingSenderId: "731260880116",
  appId: "1:731260880116:web:72d78ce3465cfb6f458aa1",
  measurementId: "G-W9P0ZE4N8Q"
};


const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});