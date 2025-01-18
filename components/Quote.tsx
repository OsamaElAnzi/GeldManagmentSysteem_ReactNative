import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Quote() {
  return (
    <View style={styles.container}>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          "A wise person should have money in their head, but not in their heart."
        </Text>
        <Text style={styles.authorText}>— Osama</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  quoteBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    maxWidth: "90%",
  },
  quoteText: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  authorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "right",
  },
});

export default Quote;
