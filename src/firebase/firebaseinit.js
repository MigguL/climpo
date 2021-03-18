import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAhti1RDP0twVfU7feLAA0oZtgGlFc3Gpo",
  authDomain: "climpo-app.firebaseapp.com",
  projectId: "climpo-app",
  storageBucket: "climpo-app.appspot.com",
  messagingSenderId: "584804536687",
  appId: "1:584804536687:web:867723779214105eb3989a",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
