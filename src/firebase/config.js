import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCotyPfYqBpxMezJ6Kl9XuJhYkyxxNcU7U",
    authDomain: "expense-tracker-2bb9f.firebaseapp.com",
    projectId: "expense-tracker-2bb9f",
    storageBucket: "expense-tracker-2bb9f.appspot.com",
    messagingSenderId: "727673588856",
    appId: "1:727673588856:web:711f6eeb4c91d5663e318d"
};

// init firebase
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()

// init Auth
const auth = getAuth()

// timestamp
const timestamp = serverTimestamp()

export { db, auth, timestamp }