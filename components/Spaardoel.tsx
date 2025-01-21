import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Spaardoel() {
  const [spaardoel, setSpaardoel] = useState<{ name: string; amount: number } | null>(null);

  const fetchSpaardoel = async () => {
    try {
      const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
      if (existingSpaardoel) {
        const parsedSpaardoel = JSON.parse(existingSpaardoel);
        if (parsedSpaardoel.length > 0) {
          setSpaardoel(parsedSpaardoel[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching spaardoel:", error);
    }
  };

  useEffect(() => {
    fetchSpaardoel();

    const interval = setInterval(fetchSpaardoel, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.card}>
      {spaardoel ? (
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>{spaardoel.name}</Text>
          <Text style={styles.goalAmount}>€ {spaardoel.amount.toFixed(2)}</Text>
        </View>
      ) : (
        <Text style={styles.noGoalsText}>Geen spaardoelen ingesteld</Text>
      )}
    </View>
  );
}

export default Spaardoel;

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
    fontSize: 16,
    fontWeight: "bold",
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
