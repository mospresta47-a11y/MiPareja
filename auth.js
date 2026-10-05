import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email.trim(), password);
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function logout() {
  return signOut(auth);
}

export function firebaseError(code) {
  const errors = {
    "auth/invalid-email": "El correo no es válido.",
    "auth/user-not-found": "No existe una cuenta con ese correo.",
    "auth/wrong-password": "Correo o contraseña incorrectos.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/email-already-in-use": "Ese correo ya está registrado.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  };
  return errors[code] || "Ha ocurrido un error. Inténtalo de nuevo.";
}
