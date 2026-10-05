import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { login, register, firebaseError } from "../services/auth";

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
    } catch (e) {
      Alert.alert("Error", firebaseError(e.code));
    }
  }

  return (
    <Screen>
      <Text style={styles.logo}>❤️</Text>
      <Text style={styles.title}>Mi Pareja</Text>
      <Text style={styles.subtitle}>
        Un espacio privado para compartir juntos.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={isRegister ? "Crear cuenta" : "Entrar"}
        onPress={submit}
      />

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.link}>
          {isRegister ? "Ya tengo una cuenta" : "Crear una cuenta"}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: { fontSize: 64, textAlign: "center", marginTop: 70 },
  title: { fontSize: 32, fontWeight: "800", textAlign: "center", marginTop: 10 },
  subtitle: { textAlign: "center", color: "#666", marginVertical: 25 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 14,
    padding: 14, marginBottom: 12, backgroundColor: "#fafafa",
  },
  link: { textAlign: "center", textDecorationLine: "underline", marginTop: 10 },
});
