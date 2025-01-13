import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
  typeTransactie: "INKOMEN" | "UITGAVEN";
  bedrag: number;
}

function Saldo() {
  const [saldo, setSaldo] = useState<string>("€0.00");

  useEffect(() => {
    const fetchSaldo = async () => {
      console.log("Fetching saldo...");
      try {
        const existingTransactions = await AsyncStorage.getItem("@transactie");
        console.log("Existing Transactions for saldo:", existingTransactions);

        if (existingTransactions) {
          const transactions = JSON.parse(existingTransactions);
          const totalSaldo = transactions.reduce(
            (acc: number, transaction: Transaction) => {
              const bedrag =
                typeof transaction.bedrag === "number" ? transaction.bedrag : 0;
              return transaction.typeTransactie === "INKOMEN"
                ? acc + bedrag
                : acc - bedrag;
            },
            0
          );

          if (isNaN(totalSaldo)) {
            setSaldo("€0.00");
          } else {
            setSaldo(`€${totalSaldo.toFixed(2)}`);
          }

          console.log("Total Saldo:", totalSaldo);
        } else {
          setSaldo("€0.00");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setSaldo("Error loading data");
      }
    };

    fetchSaldo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.saldoText}>{saldo}</Text>
    </View>
  );
}

export default Saldo;

const styles = StyleSheet.create({
  container: {
  },
  saldoText: {
    color: "lightgray",
    fontFamily: "PlayfairDisplay", // Ensure you have linked the font in the project
    fontSize: 34,
  },
});
