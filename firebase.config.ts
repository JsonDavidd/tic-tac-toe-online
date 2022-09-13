import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAyWQdjHmr30EvkplZVRs2CS9bTCYwWezY",
  authDomain: "tic-tac-toe-online-73851.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-online-73851-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-online-73851",
  storageBucket: "tic-tac-toe-online-73851.appspot.com",
  messagingSenderId: "455125229247",
  appId: "1:455125229247:web:651b1513fa9a1d29ae700a",
  measurementId: "G-YGVWVH6J4S"
};

const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase)