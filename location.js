import * as Location from "expo-location";
import { ref, set, onValue, onDisconnect } from "firebase/database";
import { realtimeDb } from "../firebase/config";

export async function startLocationSharing(coupleId, uid, onMine, onPartner) {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== "granted") {
    throw new Error("Permiso de ubicación denegado.");
  }

  const locationRef = ref(
    realtimeDb,
    `couples/${coupleId}/locations/${uid}`
  );

  const publish = async (coords) => {
    const location = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      updatedAt: Date.now(),
    };
    onMine(location);
    await set(locationRef, location);
  };

  const current = await Location.getCurrentPositionAsync({});
  await publish(current.coords);
  onDisconnect(locationRef).remove();

  const partnerRef = ref(
    realtimeDb,
    `couples/${coupleId}/locations`
  );

  const unsubscribePartner = onValue(partnerRef, (snapshot) => {
    const data = snapshot.val() || {};
    for (const [id, value] of Object.entries(data)) {
      if (id !== uid && value?.latitude && value?.longitude) {
        onPartner({
          latitude: value.latitude,
          longitude: value.longitude,
        });
      }
    }
  });

  const watcher = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      distanceInterval: 20,
      timeInterval: 10000,
    },
    ({ coords }) => publish(coords)
  );

  return () => {
    unsubscribePartner();
    watcher.remove();
  };
}
