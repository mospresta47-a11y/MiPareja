# Mi Pareja V3

V3 agrega una integración real de pasos mediante Health Connect (Android) y HealthKit (iOS), además de base para ubicación en segundo plano y development builds.

## IMPORTANTE
Esta versión NO funciona completa en Expo Go. Health Connect y HealthKit requieren un development build con código nativo.

## 1. Instalar dependencias

```bash
npm install
npx expo install
```

Si Expo propone versiones compatibles distintas para paquetes Expo, acepta las que indique `expo install`.

## 2. Configurar EAS

```bash
eas login
eas build:configure
```

Copia el `projectId` que EAS cree y reemplaza `REEMPLAZAR_CON_TU_EAS_PROJECT_ID` en `app.json`.

## 3. Android

Health Connect está integrado en Android 14+. En Android 13 o inferior puede ser necesario instalar Health Connect.

Crear development build:

```bash
npx expo prebuild --clean
eas build --profile development --platform android
```

Instala el APK generado en el teléfono. Después:

```bash
npx expo start --dev-client
```

En Bienestar > Pasos, concede acceso de lectura a Steps.

## 4. iPhone

HealthKit debe estar habilitado para el App ID en Apple Developer. Luego:

```bash
npx expo prebuild --clean
eas build --profile development --platform ios
```

En el iPhone acepta el permiso de Salud para pasos.

## 5. Ubicación en segundo plano

La app pide ubicación en primer plano y después ubicación en segundo plano. El sistema operativo puede limitar la frecuencia de actualizaciones. No hay que asumir que una app recibe GPS continuamente.

## 6. Notificaciones

El token Expo se obtiene en `services/notifications.js`. Para notificaciones reales cuando llega un mensaje con la app cerrada, falta desplegar un backend/Cloud Function que envíe el push al token de la pareja. No se simula ese envío desde el cliente.

## 7. Tiempo de pantalla

Android puede implementarse con Usage Access/UsageStatsManager y consentimiento explícito. En iOS no existe una API equivalente genérica para entregar a una app todos los datos de Screen Time; Apple exige las APIs, capacidades y restricciones correspondientes. Por eso V3 no finge esos datos.

## Seguridad

No subas datos de salud o ubicación a Firebase sin una razón clara. Mantén las reglas de Firestore/Realtime Database limitadas al `coupleId` y a los dos miembros.
