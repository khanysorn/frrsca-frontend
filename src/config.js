import firebase from "firebase";

export const config = {
    // DO NOT USE THESE CREDENTIALS ! THEY ARE HERE TO HELP IN THE LEARNING PROCESS.
    // ANY AND ALL DATA ON THAT DOMAIN IS SUBJECT TO CHANGE AND REMOVAL AT ANY TIME
    // THIS ACCOUNT IS ALSO ON THE FREE PLAN AND IS SUBJECT TO RESTRICTIONS !
    apiKey: "AIzaSyBuv5K9CWAPlwVkArH-0i2oU7p24VHhmm8",
    authDomain: "face-recognition-frrsca.firebaseapp.com",
    databaseURL: "https://face-recognition-frrsca.firebaseio.com",
    projectId: "face-recognition-frrsca",
    storageBucket: "face-recognition-frrsca.appspot.com",
    messagingSenderId: "93248378889",
    appId: "1:93248378889:web:6349730bb83fd0244980d8",
    measurementId: "G-Z6SDTFY2TB"
  };
  
  export const app = firebase.initializeApp(config);
  export default app;