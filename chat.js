import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function subscribeMessages(coupleId, callback) {
  const q = query(
    collection(db, "couples", coupleId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function sendMessage(coupleId, user, text) {
  return addDoc(
    collection(db, "couples", coupleId, "messages"),
    {
      text: text.trim(),
      senderId: user.uid,
      senderEmail: user.email,
      createdAt: serverTimestamp(),
    }
  );
}
