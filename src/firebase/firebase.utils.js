import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDEsAu8hGOAdM3HD7CigqWw5uUc_a9mZUc",
    authDomain: "crwn-db-d9804.firebaseapp.com",
    databaseURL: "https://crwn-db-d9804.firebaseio.com",
    projectId: "crwn-db-d9804",
    storageBucket: "crwn-db-d9804.appspot.com",
    messagingSenderId: "236709818302",
    appId: "1:236709818302:web:1f139d674c33390c3053ef",
    measurementId: "G-G833PE9BTL"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;