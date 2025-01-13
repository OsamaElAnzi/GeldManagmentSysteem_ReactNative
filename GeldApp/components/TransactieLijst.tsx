import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
  id: string;
  beschrijving: string;
  bedrag: number;
  typeTransactie: string;
  typeBiljet: number;

}

function TransactieLijst() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const existingTransactions = await AsyncStorage.getItem("@transactie");
        if (existingTransactions !== null) {
          setTransactions(JSON.parse(existingTransactions));
        }
      } catch (err) {
        console.log("Error retrieving data from AsyncStorage", err);
      }
    }
    fetchTransactions();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.description}>{item.beschrijving}</Text>
            <Text style={styles.bedrag}>
              €
              {typeof item.bedrag === "number" && !isNaN(item.bedrag)
                ? item.bedrag.toFixed(2)
                : "0.00"}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No transactions available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  transactionItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bedrag: {
    fontSize: 14,
    color: "green",
  },
});

export default TransactieLijst;
