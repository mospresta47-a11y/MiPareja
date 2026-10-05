import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/config";
import { getUserProfile } from "./services/couple";
import { logout } from "./services/auth";

import AuthScreen from "./screens/AuthScreen";
import CoupleSetupScreen from "./screens/CoupleSetupScreen";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [coupleId, setCoupleId] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);
        setCoupleId(profile?.coupleId || null);
      } else {
        setCoupleId(null);
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return <AuthScreen />;

  if (!coupleId) {
    return (
      <CoupleSetupScreen
        user={user}
        onReady={setCoupleId}
      />
    );
  }

  return (
    <AppNavigator
      user={user}
      coupleId={coupleId}
      onLogout={logout}
    />
  );
}
