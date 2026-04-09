// Add Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

// Firebase config (get from Firebase console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Real-time posts - updates instantly for all users
onSnapshot(collection(db, "posts"), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      // New post appears for all users automatically
      displayNewPost(change.doc.data());
    }
  });
});

// Add new post to database
async function createPost(content) {
  await addDoc(collection(db, "posts"), {
    content: content,
    author: currentUser.name,
    timestamp: new Date(),
    likes: 0
  });
}