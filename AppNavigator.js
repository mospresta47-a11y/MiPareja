import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
import CalendarScreen from "../screens/CalendarScreen";
import BudgetScreen from "../screens/BudgetScreen";
import WellnessScreen from "../screens/WellnessScreen";
import SettingsScreen from "../screens/SettingsScreen";

const tabs = [
  ["home", "🏠", "Inicio"],
  ["chat", "💬", "Chat"],
  ["map", "📍", "Mapa"],
  ["calendar", "📅", "Agenda"],
  ["budget", "💰", "Dinero"],
  ["wellness", "❤️", "Salud"],
  ["settings", "⚙️", "Más"],
];

export default function AppNavigator({ user, coupleId }) {
  const [screen, setScreen] = useState("home");

  const props = { user, coupleId };

  const content = {
    home: <HomeScreen {...props} />,
    chat: <ChatScreen {...props} />,
    map: <MapScreen {...props} />,
    calendar: <CalendarScreen {...props} />,
    budget: <BudgetScreen {...props} />,
    wellness: <WellnessScreen {...props} />,
    settings: <SettingsScreen {...props} />,
  }[screen];

  return (
    <View style={styles.root}>
      <View style={styles.content}>{content}</View>
      <View style={styles.nav}>
        {tabs.map(([id, icon, label]) => (
          <TouchableOpacity
            key={id}
            style={[styles.tab, screen === id && styles.active]}
            onPress={() => setScreen(id)}
          >
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  nav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 10,
  },
  active: { backgroundColor: "#f2f2f2" },
  icon: { fontSize: 20 },
  label: { fontSize: 10, marginTop: 2 },
});
