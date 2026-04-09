// Add this to make it truly dynamic with real-time sync
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

// Real-time posts - updates for ALL users instantly
onSnapshot(collection(db, "posts"), (snapshot) => {
    const posts = [];
    snapshot.forEach(doc => {
        posts.push({ id: doc.id, ...doc.data() });
    });
    displayPosts(posts);
});

// Real-time messages
onSnapshot(collection(db, `messages/${adminId}/conversations`), (snapshot) => {
    updateChatMessages();
});

// Real-time notifications
onSnapshot(collection(db, `users/${userId}/notifications`), (snapshot) => {
    updateNotificationBadge();
});