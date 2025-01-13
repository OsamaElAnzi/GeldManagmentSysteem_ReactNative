import React from "react";
import { View, Text, StyleSheet } from "react-native";
function Spaardoel() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Spaardoel</Text>
      <Text style={styles.cardText}>10</Text>
    </View>
  );
}

export default Spaardoel;
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
