import React from "react";
import { View, Text, StyleSheet } from "react-native";
function NogTeGaan() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Spaardoel</Text>
      <Text style={styles.cardText}>1</Text>
    </View>
  );
}

export default NogTeGaan;
const styles = StyleSheet.create({
  card: {
    width: "45%",
    backgroundColor: "#2980b9",
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#ffff",
  },
  cardText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffff",
  },
});
