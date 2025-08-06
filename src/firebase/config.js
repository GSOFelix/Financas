import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD1Z0t6_QAkemut1EyI_MW-8s2b_420HXM',
  authDomain: 'faturas-5aca6.firebaseapp.com',
  projectId: 'faturas-5aca6',
  storageBucket: 'faturas-5aca6.firebasestorage.app',
  messagingSenderId: '973690051117',
  appId: '1:973690051117:web:f6750087de46fdba0676a4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
