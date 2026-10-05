import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, secondary && styles.secondary]}
      onPress={onPress}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#111",
  },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
  secondaryText: { color: "#111" },
});
