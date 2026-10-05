# Mi Pareja V2

Esta versión añade la base de:
- bienestar separado del resto de la app;
- preferencias de privacidad;
- notificaciones Expo;
- navegación a Salud y Más;
- base correcta de Expo SDK 57.

## Instalación

```bash
npm install
npx expo start
```

## Notificaciones

Las notificaciones push requieren un development build; Expo Go no las soporta para Android desde SDK 53. Primero prueba la interfaz y después configura EAS.

```bash
npx expo install expo-dev-client
npx eas build:configure
eas build --profile development --platform android
```

Documentación:
https://docs.expo.dev/develop/development-builds/introduction/
https://docs.expo.dev/push-notifications/overview/

## Salud

La pantalla `WellnessScreen.js` es deliberadamente un adaptador de UI. No inventa datos de pasos ni intenta leer Screen Time con una API incorrecta.

La V3 añadirá:
- iOS: HealthKit;
- Android: Health Connect;
- Screen Time / App Usage con módulos nativos específicos.

Estas funciones requieren development builds y permisos nativos.

## Importante

No subas `firebase/config.js` con secretos privados adicionales. La seguridad de los datos está en las reglas de Firebase, no en ocultar el apiKey web.
