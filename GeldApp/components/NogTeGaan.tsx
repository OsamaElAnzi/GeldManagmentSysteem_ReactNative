import React from "react";
import { View, Text, StyleSheet } from "react-native";

function NogTeGaan() {
  return (
    <View style={style.card}>
      <Text>NogTeGaan</Text>
    </View>
  );
}

export default NogTeGaan;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    width: 300,
    height: 100,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
