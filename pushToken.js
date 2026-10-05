import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function saveExpoPushToken(uid, token) {
  if (!uid || !token) return;
  await setDoc(doc(db, 'users', uid), { expoPushToken: token }, { merge: true });
}
