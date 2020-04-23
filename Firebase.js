import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBLGvSUq84SL7EILfgSjwG81yYOvsVY1Fo",
  authDomain: "myapp2-86ef6.firebaseapp.com",
  databaseURL: "https://myapp2-86ef6.firebaseio.com",
  projectId: "myapp2-86ef6",
  storageBucket: "myapp2-86ef6.appspot.com",
  messagingSenderId: "147873575961",
  appId: "1:147873575961:web:b1949c594b48a8c34fa688"
}
passwordReset: email => {
  return firebase.auth().sendPasswordResetEmail(email)
}
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})

export default Firebase
