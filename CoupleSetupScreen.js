import React, { useState } from "react";
import { Alert, Text, TextInput, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { createCouple, joinCouple } from "../services/couple";

export default function CoupleSetupScreen({ user, onReady }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  async function create() {
    try {
      if (!name.trim()) throw new Error("Escribe tu nombre.");
      const id = await createCouple(user.uid, name.trim(), user.email);
      Alert.alert("Espacio creado ❤️", `Código: ${id}`);
      onReady(id);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function join() {
    try {
      if (!name.trim() || !code.trim()) {
        throw new Error("Escribe tu nombre y el código.");
      }
      const id = await joinCouple(user.uid, name.trim(), user.email, code);
      onReady(id);
    } catch (e) {
      Alert.alert("No se pudo unir", e.message);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>❤️ Nuestra pareja</Text>
      <Text style={styles.subtitle}>
        Crea un espacio o únete al que creó tu pareja.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        value={name}
        onChangeText={setName}
      />

      <Button title="Crear nuestro espacio" onPress={create} />

      <Text style={styles.or}>— o —</Text>

      <TextInput
        style={styles.input}
        placeholder="Código de pareja"
        autoCapitalize="characters"
        value={code}
        onChangeText={setCode}
      />

      <Button title="Unirme" secondary onPress={join} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: "800", textAlign: "center", marginTop: 80 },
  subtitle: { textAlign: "center", color: "#666", marginVertical: 25 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 14,
    padding: 14, marginBottom: 12,
  },
  or: { textAlign: "center", color: "#999", marginVertical: 12 },
});
