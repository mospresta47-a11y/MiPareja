import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function subscribeMoney(coupleId, callback) {
  const q = query(
    collection(db, "couples", coupleId, "money"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function createMoney(coupleId, userId, description, amount, type) {
  return addDoc(
    collection(db, "couples", coupleId, "money"),
    {
      description,
      amount,
      type,
      userId,
      createdAt: serverTimestamp(),
    }
  );
}
