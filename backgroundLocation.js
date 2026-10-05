import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

export const LOCATION_TASK = 'MI_PAREJA_BACKGROUND_LOCATION';

if (!TaskManager.isTaskDefined(LOCATION_TASK)) {
  TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
    if (error || !data?.locations?.length) return;
    // El task usa la configuración guardada por startBackgroundLocationSharing.
    // No guardamos credenciales sensibles aquí; Firebase Auth permanece en el cliente.
    return;
  });
}

export async function startBackgroundLocationSharing() {
  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== 'granted') throw new Error('Primero concede ubicación mientras usas la app.');
  const bg = await Location.requestBackgroundPermissionsAsync();
  if (bg.status !== 'granted') throw new Error('Permiso de ubicación en segundo plano denegado.');
  return true;
}
