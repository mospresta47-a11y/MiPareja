import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Screen from '../components/Screen';
import { getTodaySteps, healthPlatformName } from '../services/health';

export default function WellnessScreen() {
  const [steps, setSteps] = useState(null);
  const [loading, setLoading] = useState(false);

  const readSteps = async () => {
    setLoading(true);
    try { setSteps(await getTodaySteps()); }
    catch (e) { Alert.alert('Salud', e?.message || 'No se pudieron leer los pasos.'); }
    finally { setLoading(false); }
  };

  return <Screen>
    <Text style={styles.title}>❤️ Bienestar</Text>
    <Text style={styles.subtitle}>Los datos se leen desde el sistema de salud del teléfono y no se inventan.</Text>
    <View style={styles.card}>
      <Text style={styles.label}>👟 Pasos de hoy</Text>
      <Text style={styles.value}>{steps === null ? '—' : steps.toLocaleString('es-MX')}</Text>
      <Text style={styles.small}>{healthPlatformName()}</Text>
      <TouchableOpacity style={styles.button} onPress={readSteps} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Leer pasos</Text>}
      </TouchableOpacity>
    </View>
    <View style={styles.card}>
      <Text style={styles.label}>📱 Tiempo de pantalla</Text>
      <Text style={styles.value}>Android: posible con Usage Access. iPhone: requiere APIs/entitlements de Screen Time de Apple.</Text>
    </View>
    <View style={styles.card}>
      <Text style={styles.label}>🔐 Privacidad</Text>
      <Text style={styles.value}>Solo se solicita el permiso de pasos. El usuario decide si lo concede.</Text>
    </View>
  </Screen>;
}
const styles = StyleSheet.create({ title:{fontSize:29,fontWeight:'800',marginBottom:8}, subtitle:{color:'#666',marginBottom:18,lineHeight:21}, card:{padding:18,borderWidth:1,borderColor:'#eee',borderRadius:18,marginBottom:12}, label:{fontSize:19,fontWeight:'800',marginBottom:6}, value:{fontSize:18,fontWeight:'700',lineHeight:24}, small:{color:'#777',marginTop:6}, button:{marginTop:14,padding:13,borderRadius:12,backgroundColor:'#111',alignItems:'center'}, buttonText:{color:'#fff',fontWeight:'800'} });
