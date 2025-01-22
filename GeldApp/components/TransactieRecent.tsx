import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
  id: string;
  beschrijving: string;
  bedrag: number;
  typeTransactie: string;
  typeBiljet: number;
}

function TransactieRecent() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const existingTransactions = await AsyncStorage.getItem("@transactie");
        if (existingTransactions) {
          setTransactions(JSON.parse(existingTransactions));
        }
      } catch (err) {
        console.log("Error retrieving data from AsyncStorage", err);
      }
    }
    fetchTransactions();
    const intervalTransactions = setInterval(fetchTransactions, 2000)
    return () => clearInterval(intervalTransactions);
  }, []);

  return (
    <View style={styles.container}>
      {transactions.slice(0, 3).map((transaction) => (
        <View key={transaction.id} style={styles.transaction}>
          <Text style={styles.description}>{transaction.beschrijving}</Text>
          <Text style={styles.amount}>
            {transaction.bedrag} EUR - {transaction.typeTransactie}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transaction: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    color: "#777",
  },
});

export default TransactieRecent;
