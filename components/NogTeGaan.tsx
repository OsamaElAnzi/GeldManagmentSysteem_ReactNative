import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
  typeTransactie: "INKOMEN" | "UITGAVEN";
  bedrag: number;
}

function NogTeGaan() {
  const [nogTeGaan, setNogTeGaan] = useState<{ name: string; amount: number }[]>([]);
  const [spaardoel, setSpaardoel] = useState<{ name: string; amount: number }[]>([]);
  const [saldo, setSaldo] = useState<number>(0);

  useEffect(() => {
    const fetchTussenstand = async () => {
      try {
        const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
        const existingTransactions = await AsyncStorage.getItem("@transactie");

        console.log("Existing Transactions for saldo:", existingTransactions);

        if (existingTransactions) {
          const transactions = JSON.parse(existingTransactions);
          const totalSaldo = transactions.reduce(
            (acc: number, transaction: Transaction) => {
              const bedrag = typeof transaction.bedrag === "number" ? transaction.bedrag : 0;
              return transaction.typeTransactie === "INKOMEN"
                ? acc + bedrag
                : acc - bedrag;
            },
            0
          );
          setSaldo(totalSaldo);

          console.log("Total Saldo:", totalSaldo);
        }

        if (existingSpaardoel) {
          const parsedSpaardoel = JSON.parse(existingSpaardoel);
          setSpaardoel(parsedSpaardoel);

          const remainingAmount = parseFloat(parsedSpaardoel[0]?.amount || 0) - saldo;
          setNogTeGaan([{ name: "Nog te gaan", amount: remainingAmount }]);
        } else {
          setNogTeGaan([{ name: "Nog te gaan", amount: 0 }]);
        }
      } catch (error) {
        console.error("Error fetching spaardoel:", error);
      }
    };

    fetchTussenstand();
  }, [saldo]);

  return (
    <View style={styles.card}>
        {nogTeGaan.map((item, index) => (
          <View
          style={styles.goalContainer}
          key={index}>
            <Text style={styles.goalTitle}>{item.name}</Text>
            <Text style={styles.goalAmount}>€ {item.amount.toFixed(2)}</Text>
          </View>
        ))}
    </View>
  );
}

export default NogTeGaan;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  goalContainer: {
    marginBottom: 5,
  },
  goalTitle: {
    fontSize: 13,
    color: "#fff",
  },
  goalAmount: {
    fontSize: 20,
    color: "#f1c40f",
  },
  noGoalsText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
});
