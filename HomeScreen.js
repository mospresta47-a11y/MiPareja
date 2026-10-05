import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";

export default function HomeScreen({ coupleId }) {
  return (
    <Screen>
      <Text style={styles.title}>Nuestro espacio ❤️</Text>
      <Text style={styles.subtitle}>Código: {coupleId}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💬 Chat</Text>
        <Text style={styles.cardText}>Mensajes privados en tiempo real.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Ubicación</Text>
        <Text style={styles.cardText}>Comparte tu ubicación actual.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Agenda</Text>
        <Text style={styles.cardText}>Eventos y citas compartidas.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💰 Dinero</Text>
        <Text style={styles.cardText}>Ingresos, gastos y balance.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 29, fontWeight: "800", marginBottom: 5 },
  subtitle: { color: "#777", marginBottom: 20 },
  card: {
    padding: 18, borderWidth: 1, borderColor: "#eee",
    borderRadius: 18, marginBottom: 12,
  },
  cardTitle: { fontSize: 20, fontWeight: "700", marginBottom: 5 },
  cardText: { color: "#666" },
});
