import React from "react";
import { View, Text, StyleSheet } from "react-native";

function NogTeGaan() {
  return (
    <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Nog te gaan</Text>
            <Text style={styles.cardText}></Text>
          </View>
        </View>
  );
}

export default NogTeGaan;

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
});