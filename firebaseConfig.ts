// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCTGRw0M1tP8OqAVkFgzggN22MJTw6YaLU",
  authDomain: "bambon-c26cc.firebaseapp.com",
  projectId: "bambon-c26cc",
  storageBucket: "bambon-c26cc.firebasestorage.app",
  messagingSenderId: "463865111771",
  appId: "1:463865111771:web:6470120064f631510b58fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);