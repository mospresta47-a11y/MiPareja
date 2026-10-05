import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function createCouple(uid, name, email) {
  const coupleId = makeCode();

  await setDoc(doc(db, "couples", coupleId), {
    createdAt: serverTimestamp(),
    createdBy: uid,
    members: { [uid]: true },
  });

  await setDoc(doc(db, "couples", coupleId, "profiles", uid), {
    name,
    email,
  });

  await setDoc(doc(db, "users", uid), {
    coupleId,
    name,
    email,
  }, { merge: true });

  return coupleId;
}

export async function joinCouple(uid, name, email, code) {
  const coupleId = code.trim().toUpperCase();
  const coupleRef = doc(db, "couples", coupleId);
  const snap = await getDoc(coupleRef);

  if (!snap.exists()) throw new Error("Código de pareja incorrecto.");

  const data = snap.data();
  const members = data.members || {};
  const memberIds = Object.keys(members);

  if (members[uid]) return coupleId;
  if (memberIds.length >= 2) {
    throw new Error("Esta pareja ya tiene dos miembros.");
  }

  await updateDoc(coupleRef, {
    [`members.${uid}`]: true,
  });

  await setDoc(doc(db, "couples", coupleId, "profiles", uid), {
    name,
    email,
  });

  await setDoc(doc(db, "users", uid), {
    coupleId,
    name,
    email,
  }, { merge: true });

  return coupleId;
}
