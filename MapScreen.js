import React, { useEffect, useState } from "react";
import { Alert, ActivityIndicator, Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Screen from "../components/Screen";
import { startLocationSharing } from "../services/location";

export default function MapScreen({ user, coupleId }) {
  const [mine, setMine] = useState(null);
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    let cleanup;

    startLocationSharing(
      coupleId,
      user.uid,
      setMine,
      setPartner
    ).then((fn) => {
      cleanup = fn;
    }).catch((e) => Alert.alert("Ubicación", e.message));

    return () => cleanup?.();
  }, [coupleId, user.uid]);

  if (!mine) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Nuestra ubicación</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...mine,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        <Marker coordinate={mine} title="Tú" />
        {partner && <Marker coordinate={partner} title="Tu pareja ❤️" />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 25, fontWeight: "800", padding: 15 },
  map: { flex: 1 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
