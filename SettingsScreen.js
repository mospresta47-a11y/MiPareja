import React, { useState } from "react";
import { Alert, Switch, Text, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { registerForPushNotifications } from "../services/notifications";
import { logout } from "../services/auth";

export default function SettingsScreen() {
  const [shareSteps, setShareSteps] = useState(true);
  const [shareScreenTime, setShareScreenTime] = useState(false);

  async function notifications() {
    const token = await registerForPushNotifications();
    Alert.alert(
      token ? "Notificaciones activadas" : "No activadas",
      token ? "El dispositivo ya puede recibir notificaciones." :
        "No se obtuvo permiso o falta configurar EAS."
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>⚙️ Privacidad</Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Compartir pasos</Text>
          <Text style={styles.help}>Tu pareja podrá ver tus pasos.</Text>
        </View>
        <Switch value={shareSteps} onValueChange={setShareSteps} />
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Compartir tiempo de pantalla</Text>
          <Text style={styles.help}>Desactivado hasta integrar el módulo nativo.</Text>
        </View>
        <Switch value={shareScreenTime} onValueChange={setShareScreenTime} />
      </View>

      <Button title="Activar notificaciones" onPress={notifications} />
      <Button title="Cerrar sesión" secondary onPress={logout} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 29, fontWeight: "800", marginBottom: 20 },
  row: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: "#eee",
  },
  label: { fontSize: 16, fontWeight: "700" },
  help: { color: "#777", marginTop: 4, paddingRight: 10 },
});
