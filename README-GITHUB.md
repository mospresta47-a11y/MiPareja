# MiPareja — APK automática con GitHub Actions

## Qué necesitas

1. Una cuenta de GitHub.
2. Una cuenta de Expo.
3. Un repositorio llamado `MiPareja`.
4. El secreto `EXPO_TOKEN` configurado en GitHub.

## Subir el proyecto

Sube **el contenido de esta carpeta**, no la carpeta contenedora completa.

La estructura debe empezar así:

```text
MiPareja/
├── App.js
├── app.json
├── eas.json
├── package.json
├── .github/
│   └── workflows/
│       └── build-apk.yml
├── components/
├── firebase/
├── functions/
├── navigation/
├── screens/
└── services/
```

## Crear EXPO_TOKEN

En Expo crea un Access Token. En GitHub ve a:

`Settings → Secrets and variables → Actions → New repository secret`

Nombre:

```text
EXPO_TOKEN
```

Pega el token como valor. **No lo guardes en el código.**

## Generar la APK

En GitHub:

`Actions → Generar APK MiPareja → Run workflow`

El workflow crea/vincula el proyecto EAS y ejecuta un build Android con el perfil `preview`.

El perfil está configurado para generar un archivo `.apk` instalable directamente en Android.

## Importante

La compilación puede completarse aunque todavía falten configurar Firebase, pero para que la aplicación funcione con chat, pareja, mapa y demás servicios debes colocar tu configuración de Firebase en `firebase/config.js`.

Health Connect requiere permisos del usuario y un build nativo. Esta aplicación no debe probarse como si fuera una app normal de Expo Go.
