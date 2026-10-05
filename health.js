import { Platform } from 'react-native';

let hc = null;
let ahk = null;

async function loadModules() {
  if (Platform.OS === 'android' && !hc) {
    try { hc = await import('react-native-health-connect'); } catch (_) { hc = null; }
  }
  if (Platform.OS === 'ios' && !ahk) {
    try { ahk = (await import('react-native-health')).default; } catch (_) { ahk = null; }
  }
}

export async function getTodaySteps() {
  await loadModules();
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date();

  if (Platform.OS === 'android') {
    if (!hc) throw new Error('Health Connect no está disponible en este build.');
    const initialized = await hc.initialize();
    if (!initialized) throw new Error('No se pudo iniciar Health Connect.');
    await hc.requestPermission([{ accessType: 'read', recordType: 'Steps' }]);
    const result = await hc.readRecords('Steps', {
      timeRangeFilter: { operator: 'between', startTime: start.toISOString(), endTime: end.toISOString() },
    });
    return (result.records || []).reduce((sum, item) => sum + Number(item.count || 0), 0);
  }

  if (Platform.OS === 'ios') {
    if (!ahk) throw new Error('HealthKit no está disponible en este build.');
    return await new Promise((resolve, reject) => {
      const permissions = { permissions: { read: [ahk.Constants.Permissions.Steps], write: [] } };
      ahk.initHealthKit(permissions, (error) => {
        if (error) return reject(new Error(error));
        ahk.getStepCount({ startDate: start.toISOString(), endDate: end.toISOString(), includeManuallyAdded: true }, (err, result) => {
          if (err) return reject(new Error(err));
          resolve(Number(result?.value || 0));
        });
      });
    });
  }

  throw new Error('Plataforma no compatible.');
}

export function healthPlatformName() {
  return Platform.OS === 'ios' ? 'Apple Health / HealthKit' : Platform.OS === 'android' ? 'Health Connect' : 'No disponible';
}
