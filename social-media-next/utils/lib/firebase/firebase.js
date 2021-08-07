// import * as admin from 'firebase-admin';
import firebase from 'firebase/app';
import { ref } from 'firebase/storage';
const ENV = process.env;

admin.initializeApp({
  credentials: admin.credential.applicationDefault(),
  databaseURL: `https://${ENV.FIREBASE_DATABASE_NAME}.firebaseio.com`
});
//creating firebase bucket credentials and etc here
const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  // databaseURL: `https://${ENV.FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export default storage;
