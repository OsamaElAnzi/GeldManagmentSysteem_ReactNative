import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Vermogen() {
  return (
    <View style={style.card}>
      <Text>Vermogen</Text>
    </View>
  );
}

export default Vermogen;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
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
  },
});
