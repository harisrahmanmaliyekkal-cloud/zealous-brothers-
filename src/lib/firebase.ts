/**
 * Firebase Client Configuration & Service Helpers
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore,
  getFirestore,
  setLogLevel,
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocFromServer,
  Firestore
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Target database ID
const targetDatabaseId = 
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)' 
    ? firebaseConfig.firestoreDatabaseId 
    : undefined;

// Robust Firestore initialization with force long-polling
// This prevents WebChannel streaming failure inside iframe sandboxes & proxies
let dbInstance: Firestore;
try {
  dbInstance = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  }, targetDatabaseId);
} catch (e) {
  // If already initialized in hot-reload, grab existing instance
  dbInstance = getFirestore(app, targetDatabaseId);
}

// Suppress transient offline warning logs
try {
  setLogLevel('error');
} catch (e) {
  // Ignore
}

export const db = dbInstance;
export const auth = getAuth(app);

export { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  getDocFromServer,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
export type { User };
