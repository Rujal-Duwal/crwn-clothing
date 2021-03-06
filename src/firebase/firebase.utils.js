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


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const collectionRef =firestore.collection('users')

    const snapshot = await userRef.get()
    const collectionSnapshot=await collectionRef.get();
    console.log({collectionSnapshot})

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef

}

export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
    const collectionRef=firestore.collection(collectionKey)
    console.log(collectionRef)
    const batch =firestore.batch()
    objectsToAdd.forEach(obj=>{
        const newDocRef=collectionRef.doc()
        batch.set(newDocRef,obj)
    })

    return await batch.commit()
}

export const convertCollectionSnapshotToMap=(collectionsSnapshot)=>{
    const transformedCollection=collectionsSnapshot.docs.map(doc=>{
        const {title,items}=doc.data()
        return{
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    })
    console.log('transformedCollection',transformedCollection)
    return transformedCollection.reduce((accumulator,collection)=>{
        accumulator[collection.title.toLowerCase()]=collection;
        return accumulator;
    },{})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;