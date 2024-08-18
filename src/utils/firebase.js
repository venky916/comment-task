// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9pVz4Gh1hv5Dnv4EjuUWg6WtFTgNFTmI",
    authDomain: "comment-task-a288c.firebaseapp.com",
    projectId: "comment-task-a288c",
    storageBucket: "comment-task-a288c.appspot.com",
    messagingSenderId: "367637022479",
    appId: "1:367637022479:web:ae0b2b5227495d3cfc207a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
