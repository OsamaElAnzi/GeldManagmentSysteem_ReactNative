import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Spaardoel() {
  return (
    <View style={style.card}>
      <Text>Spaardoel</Text>
    </View>
  );
}

export default Spaardoel;

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    marginTop: 10,
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