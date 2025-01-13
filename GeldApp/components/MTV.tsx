import React, { useState } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const MTV = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [beschrijving, onChangeBeschrijfing] = useState("");
  const [bedrag, onChangeBedrag] = useState("");
  const [typeTransactie, onChangeTypeTransactie] = useState("");
  const [typeBiljet, onChangeTypeBiljet] = useState("");
  const [open, setOpen] = useState(false);
  const [openEen, setOpenEen] = useState(false);
  const [biljetten, setBiljetten] = useState([
    { label: "5 EUR", value: "5" },
    { label: "10 EUR", value: "10" },
    { label: "20 EUR", value: "20" },
    { label: "50 EUR", value: "50" },
    { label: "100 EUR", value: "100" },
    { label: "200 EUR", value: "200" },
    { label: "500 EUR", value: "500" },
  ]);
  const [inkomenUitgaven, setInkomenUitgaven] = useState([
    { label: "Inkomen", value: "INKOMEN" },
    { label: "Uitgaven", value: "UITGAVEN" },
  ]);

  const resetForm = () => {
    onChangeBedrag("");
    onChangeBeschrijfing("");
    onChangeTypeTransactie("");
    onChangeTypeBiljet("");
  };

  const handleAddTransaction = async () => {
    if (!bedrag || !typeTransactie || !beschrijving) {
      Alert.alert("Fout", "Vul alle velden in!");
      return;
    }

    const parsedBedrag = parseFloat(bedrag);
    if (isNaN(parsedBedrag) || parsedBedrag <= 0) {
      Alert.alert("Fout", "Het bedrag moet een positief getal zijn!");
      return;
    }

    const transaction = {
      bedrag: parsedBedrag,
      typeTransactie,
      beschrijving,
      typeBiljet,
    };

    try {
      const existingTransactions = await AsyncStorage.getItem("@transactie");
      const transactions = existingTransactions ? JSON.parse(existingTransactions) : [];

      transactions.push(transaction);
      await AsyncStorage.setItem("@transactie", JSON.stringify(transactions));

      resetForm();
      setModalVisible(false);
      Alert.alert("Succes", "Transactie succesvol opgeslagen!");
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
      Alert.alert("Fout", "Er is iets mis gegaan met het opslaan van de transactie!");
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Voeg een nieuwe transactie toe</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeBedrag}
                placeholder="Bedrag"
                keyboardType="numeric"
                value={bedrag}
              />
              <DropDownPicker
                open={openEen}
                value={typeTransactie}
                items={inkomenUitgaven}
                setOpen={setOpenEen}
                setValue={onChangeTypeTransactie}
                setItems={setInkomenUitgaven}
                placeholder="Selecteer type transactie"
                style={styles.dropdown1}
                textStyle={styles.dropdownText}
                dropDownStyle={styles.dropdownStyle}
              />
              <DropDownPicker
                open={open}
                value={typeBiljet}
                items={biljetten}
                setOpen={setOpen}
                setValue={onChangeTypeBiljet}
                setItems={setBiljetten}
                placeholder="Selecteer een biljet"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownStyle={styles.dropdownStyle}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeBeschrijfing}
                placeholder="Beschrijving"
                value={beschrijving}
              />
              <Pressable style={styles.button} onPress={handleAddTransaction}>
                <Text style={styles.buttonText}>Voeg toe</Text>
              </Pressable>
              <Pressable style={styles.buttonSecondary} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Sluit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Voeg transactie toe!</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  dropdown1: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 8,
    zIndex: 1, // Ensure this dropdown appears above others
  },
  dropdown: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 8,
    zIndex: 0, // Ensure this dropdown appears behind others
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownStyle: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    opacity: 0.9,
  },
  buttonSecondary: {
    backgroundColor: "#757575",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    opacity: 0.9,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MTV;
