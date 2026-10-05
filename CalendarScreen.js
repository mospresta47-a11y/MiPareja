import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { createEvent, subscribeEvents } from "../services/calendar";

export default function CalendarScreen({ coupleId }) {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => subscribeEvents(coupleId, setEvents), [coupleId]);

  async function add() {
    if (!title.trim() || !date.trim()) {
      Alert.alert("Faltan datos", "Introduce título y fecha.");
      return;
    }
    await createEvent(coupleId, title.trim(), date.trim());
    setTitle("");
    setDate("");
  }

  return (
    <Screen>
      <Text style={styles.title}>📅 Agenda</Text>
      <TextInput style={styles.input} placeholder="Ej. Cena juntos"
        value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="2026-10-14"
        value={date} onChangeText={setDate} />
      <Button title="Añadir evento" onPress={add} />

      <FlatList
        data={events}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.event}>{item.title}</Text>
            <Text>📅 {item.date}</Text>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 29, fontWeight: "800", marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 14,
    padding: 14, marginBottom: 12,
  },
  card: {
    padding: 15, borderWidth: 1, borderColor: "#eee",
    borderRadius: 14, marginBottom: 10,
  },
  event: { fontSize: 17, fontWeight: "700", marginBottom: 5 },
});
