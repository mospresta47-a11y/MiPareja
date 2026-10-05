# Mi Pareja — V1

Aplicación privada de pareja con Expo + Firebase.

## 1. Instalar

```bash
npm install
npx expo start
```

## 2. Firebase

Crea un proyecto en Firebase y activa:

- Authentication > Email/Password
- Firestore Database
- Realtime Database

Registra una aplicación Web y copia la configuración a:

`firebase/config.js`

## 3. Reglas

Copia `firestore.rules` a Firestore > Rules.

Copia `database.rules.json` a Realtime Database > Rules.

## 4. Probar

Instala Expo Go en los dos teléfonos.

Ejecuta:

```bash
npx expo start
```

Escanea el QR.

Una persona crea la pareja y comparte el código de 6 caracteres.
La otra crea su cuenta y utiliza ese código.

## Incluido

- Login / registro
- Pareja de máximo dos miembros
- Chat en tiempo real
- Ubicación compartida mientras la app está abierta
- Agenda compartida
- Presupuesto compartido

## Próxima fase

- HealthKit (iOS)
- Health Connect (Android)
- Screen Time / uso de aplicaciones
- notificaciones
- imágenes en chat
- calendario visual
- APK mediante EAS
