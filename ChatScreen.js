import React, { useEffect, useState } from "react";
import {
  Alert, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet
} from "react-native";
import Screen from "../components/Screen";
import { sendMessage, subscribeMessages } from "../services/chat";

export default function ChatScreen({ user, coupleId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => subscribeMessages(coupleId, setMessages), [coupleId]);

  async function send() {
    const value = text.trim();
    if (!value) return;
    try {
      await sendMessage(coupleId, user, value);
      setText("");
    } catch (e) {
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>💬 Chat</Text>

      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const mine = item.senderId === user.uid;
          return (
            <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
              <Text style={mine ? styles.mineText : styles.theirText}>
                {item.text}
              </Text>
            </View>
          );
        }}
      />

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Escribe algo..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.send} onPress={send}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 29, fontWeight: "800", marginBottom: 10 },
  bubble: { maxWidth: "78%", padding: 12, borderRadius: 16, marginVertical: 4 },
  mine: { alignSelf: "flex-end", backgroundColor: "#111" },
  theirs: { alignSelf: "flex-start", backgroundColor: "#eee" },
  mineText: { color: "#fff" },
  theirText: { color: "#111" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  input: {
    flex: 1, borderWidth: 1, borderColor: "#ddd",
    borderRadius: 22, paddingHorizontal: 15, paddingVertical: 11,
  },
  send: {
    marginLeft: 8, width: 45, height: 45, borderRadius: 23,
    backgroundColor: "#111", alignItems: "center", justifyContent: "center",
  },
  sendText: { color: "#fff", fontSize: 20 },
});
