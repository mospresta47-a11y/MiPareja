import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function subscribeEvents(coupleId, callback) {
  const q = query(
    collection(db, "couples", coupleId, "events"),
    orderBy("date", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function createEvent(coupleId, title, date) {
  return addDoc(
    collection(db, "couples", coupleId, "events"),
    { title, date, createdAt: serverTimestamp() }
  );
}
