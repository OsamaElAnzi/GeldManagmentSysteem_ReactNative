import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Vermogen from "@/components/Vermogen";
import NogTeGaan from "@/components/NogTeGaan";
import Spaardoel from "@/components/Spaardoel";

function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Vermogen />
        <NogTeGaan />
        <Spaardoel />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },
});
