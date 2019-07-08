import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAeqOosem85SSGDyLTxAJIIpypq495n39I",
  authDomain: "react-my-recipe-cf95f.firebaseapp.com",
  databaseURL: "https://react-my-recipe-cf95f.firebaseio.com",
  projectId: "react-my-recipe-cf95f",
  storageBucket: "react-my-recipe-cf95f.appspot.com",
  messagingSenderId: "754189613693",
  appId: "1:754189613693:web:ec22169269ea6fa2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
