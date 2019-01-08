import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyDEdL_X9tsVjxAohlmo-N6z94Fe4Hm2kDQ",
    authDomain: "project-3-10d7a.firebaseapp.com",
    databaseURL: "https://project-3-10d7a.firebaseio.com",
    projectId: "project-3-10d7a",
    storageBucket: "project-3-10d7a.appspot.com",
    messagingSenderId: "967245710812"
});

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;