import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Vermogen() {
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem("@transactie");
      const transactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      // Calculate total amount
      const total = transactions.reduce(
        (
          acc: number,
          transaction: { bedrag: string; typeTransactie: string }
        ) => {
          const amount = parseFloat(transaction.bedrag) || 0;
          return transaction.typeTransactie === "INKOMEN"
            ? acc + amount
            : acc - amount;
        },
        0
      );

      setTotalAmount(total);
    } catch (error) {
      Alert.alert(
        "Fout",
        "Er is een fout opgetreden bij het ophalen van de gegevens."
      );
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    calculateTotal();

    const interval = setInterval(() => {
      calculateTotal();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Vermogen</Text>
        <Text
          style={[
            styles.amountText,
            { color: totalAmount > 0 ? "#4caf50" : "#f44336" },
          ]}
        >
          {totalAmount != null
            ? (totalAmount > 0 ? "+€" : "-€") + Math.abs(totalAmount).toFixed(2)
            : "€0.00"}
        </Text>
      </View>
    </View>
  );
}

export default Vermogen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
  },
  card: {
    width: 320,
    height: 120,
    backgroundColor: "#415d43",
    padding: 25,
    borderRadius: 12,
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#a1cca5",
  },
  amountText: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 10,
  },
});
