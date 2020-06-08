import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyB-61mOI7k4oJF5z6ljZmEZNszQaO0V-9k",
    authDomain: "employees-31296.firebaseapp.com",
    databaseURL: "https://employees-31296.firebaseio.com",
    projectId: "employees-31296",
    storageBucket: "employees-31296.appspot.com",
    messagingSenderId: "21710958797",
    appId: "1:21710958797:web:7d0b9ed2017a0976647984"
};
// Initialize Firebase

const appFirebase = firebase.initializeApp(firebaseConfig);
export default appFirebase;
