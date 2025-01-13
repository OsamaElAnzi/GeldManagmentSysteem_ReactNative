import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Modal,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const MTV = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [beschrijving, onChangeBeschrijfing] = useState("");
  const [bedrag, onChangeBedrag] = useState("");
  const [typeTransactie, onChangeTypeTransactie] = useState("");
  const [typeBiljet, onChangeTypeBiljet] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "5 EUR", value: "5" },
    { label: "10 EUR", value: "10" },
    { label: "20 EUR", value: "20" },
    { label: "50 EUR", value: "50" },
    { label: "100 EUR", value: "100" },
    { label: "200 EUR", value: "200" },
    { label: "500 EUR", value: "500" },
  ]);

  const resetForm = () => {
    onChangeBedrag("");
    onChangeBeschrijfing("");
    onChangeTypeTransactie("");
    onChangeTypeBiljet("");
  };

  const handleAddTransaction = async () => {
    console.log("Adding transaction...");

    if (!bedrag || !typeTransactie || !beschrijving) {
      Alert.alert("Fout", "Vul alle velden in!");
      return;
    }

    // Validate that the amount is a positive number
    const parsedBedrag = parseFloat(bedrag);
    if (isNaN(parsedBedrag) || parsedBedrag <= 0) {
      Alert.alert("Fout", "Het bedrag moet een positief getal zijn!");
      return;
    }

    const transaction = {
      bedrag: parsedBedrag, // Ensure this is a number
      typeTransactie,
      beschrijving,
      typeBiljet,
    };

    try {
      const existingTransactions = await AsyncStorage.getItem("@transactie");
      console.log("Existing Transactions:", existingTransactions);

      const transactions = existingTransactions
        ? JSON.parse(existingTransactions)
        : [];
      console.log("Parsed Transactions:", transactions);

      transactions.push(transaction);
      console.log("New Transactions List:", transactions);

      await AsyncStorage.setItem("@transactie", JSON.stringify(transactions));
      console.log("Transaction saved!");

      resetForm();
      setModalVisible(false);
      Alert.alert("Succes", "Transactie succesvol opgeslagen!");
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
      Alert.alert(
        "Fout",
        "Er is iets mis gegaan met het opslaan van de transactie!"
      );
    }
  };

  const handleCloseModal = () => {
    resetForm();
    setModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Voeg hier je transactie aan toe!
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeBedrag}
                placeholder="Bedrag"
                keyboardType="numeric"
                value={bedrag}
              />
              <View style={styles.radioGroup}>
                <RadioButton
                  value="INKOMEN"
                  status={
                    typeTransactie === "INKOMEN" ? "checked" : "unchecked"
                  }
                  onPress={() => onChangeTypeTransactie("INKOMEN")}
                />
                <Text>INKOMEN</Text>
                <RadioButton
                  value="UITGAVEN"
                  status={
                    typeTransactie === "UITGAVEN" ? "checked" : "unchecked"
                  }
                  onPress={() => onChangeTypeTransactie("UITGAVEN")}
                />
                <Text>UITGAVEN</Text>
              </View>
              <DropDownPicker
                open={open}
                value={typeBiljet}
                items={items}
                setOpen={setOpen}
                setValue={onChangeTypeBiljet}
                setItems={setItems}
                placeholder="Selecteer een type biljet"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeBeschrijfing}
                placeholder="Beschrijving"
                value={beschrijving}
              />
              <Pressable style={styles.button} onPress={handleAddTransaction}>
                <Text style={styles.textStyle}>Voeg toe</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleCloseModal}>
                <Text style={styles.textStyle}>Sluit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Voeg transactie toe!</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalView: { backgroundColor: "#2f3c53", padding: 35, borderRadius: 15 },
  button: {
    backgroundColor: "#4b8f8c",
    padding: 12,
    margin: 10,
    borderRadius: 8,
  },
  textStyle: { color: "white", fontWeight: "bold", textAlign: "center" },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default MTV;
