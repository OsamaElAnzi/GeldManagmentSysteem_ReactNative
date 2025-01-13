import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Saldo from "@/components/Saldo";
import MTV from "@/components/MTV";
import Status from "@/components/Status";
import TransactieRecent from "@/components/TransactieRecent";


function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Saldo />
        <Status />
        <MTV />
        <TransactieRecent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 24,

  },
});
