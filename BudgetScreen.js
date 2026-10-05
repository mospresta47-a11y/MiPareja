import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { createMoney, subscribeMoney } from "../services/budget";

export default function BudgetScreen({ user, coupleId }) {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => subscribeMoney(coupleId, setItems), [coupleId]);

  const balance = useMemo(
    () => items.reduce(
      (sum, item) => sum + (item.type === "income" ? item.amount : -item.amount),
      0
    ),
    [items]
  );

  async function add() {
    const numeric = Number(amount.replace(",", "."));
    if (!description.trim() || !numeric || numeric < 0) {
      Alert.alert("Faltan datos", "Introduce una descripción y cantidad válida.");
      return;
    }
    await createMoney(
      coupleId, user.uid, description.trim(), numeric, type
    );
    setDescription("");
    setAmount("");
  }

  return (
    <Screen>
      <Text style={styles.title}>💰 Presupuesto</Text>

      <View style={styles.balance}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
      </View>

      <TextInput style={styles.input} placeholder="Descripción"
        value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Cantidad"
        keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.type, type === "expense" && styles.active]}
          onPress={() => setType("expense")}
        >
          <Text>💸 Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.type, type === "income" && styles.active]}
          onPress={() => setType("income")}
        >
          <Text>💵 Ingreso</Text>
        </TouchableOpacity>
      </View>

      <Button title="Registrar" onPress={add} />

      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => (
          <View style={styles.money}>
            <View style={{ flex: 1 }}>
              <Text style={styles.desc}>{item.description}</Text>
              <Text>{item.type === "income" ? "Ingreso" : "Gasto"}</Text>
            </View>
            <Text style={styles.amount}>
              {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 29, fontWeight: "800", marginBottom: 15 },
  balance: {
    backgroundColor: "#111", borderRadius: 18, padding: 20, marginBottom: 15,
  },
  balanceLabel: { color: "#aaa" },
  balanceValue: { color: "#fff", fontSize: 35, fontWeight: "800", marginTop: 4 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 14,
    padding: 14, marginBottom: 12,
  },
  row: { flexDirection: "row", gap: 10, marginBottom: 12 },
  type: {
    flex: 1, borderWidth: 1, borderColor: "#ddd",
    borderRadius: 12, padding: 12, alignItems: "center",
  },
  active: { backgroundColor: "#eee", borderColor: "#111" },
  money: {
    flexDirection: "row", alignItems: "center",
    padding: 15, borderWidth: 1, borderColor: "#eee",
    borderRadius: 14, marginBottom: 10,
  },
  desc: { fontWeight: "700", fontSize: 16 },
  amount: { fontWeight: "800", fontSize: 17 },
});
