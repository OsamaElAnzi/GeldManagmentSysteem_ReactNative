import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Modal,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

function MTV() {
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
  };

  const handleAddTransaction = () => {
    if (!bedrag || !typeTransactie || !beschrijving) {
      Alert.alert("Fout", "Vul alle velden in!");
      return;
    }
    console.log({ bedrag, typeTransactie, beschrijving });
    resetForm();
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const { width } = Dimensions.get("window");

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
                <View style={styles.radioButton}>
                  <RadioButton
                    value="INKOMEN"
                    status={typeTransactie === "INKOMEN" ? "checked" : "unchecked"}
                    onPress={() => onChangeTypeTransactie("INKOMEN")}
                  />
                  <Text style={styles.radioLabel}>INKOMEN</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton
                    value="UITGAVEN"
                    status={typeTransactie === "UITGAVEN" ? "checked" : "unchecked"}
                    onPress={() => onChangeTypeTransactie("UITGAVEN")}
                  />
                  <Text style={styles.radioLabel}>UITGAVEN</Text>
                </View>
              </View>
              <DropDownPicker
                open={open}
                value={typeBiljet}
                items={items}
                setOpen={setOpen}
                setValue={onChangeTypeBiljet}
                setItems={setItems}
                placeholder="Selecteer een type biljet"
                style={styles.dropDown}
                dropDownContainerStyle={styles.dropDownContainer}
                placeholderStyle={styles.dropDownPlaceholder}
                textStyle={styles.dropDownText}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeBeschrijfing}
                placeholder="Beschrijving"
                value={beschrijving}
              />
              <View style={styles.column}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleAddTransaction}
                >
                  <Text style={styles.textStyle}>Voeg toe</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.textStyle}>Sluit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Voeg transactie toe!</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2f3c53", // Deep blue-gray for a professional feel
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get("window").width * 0.85,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    margin: 10,
    elevation: 3,
    width: Dimensions.get("window").width * 0.8,
  },
  buttonOpen: {
    backgroundColor: "#4b8f8c", // A professional teal color
  },
  buttonClose: {
    backgroundColor: "#4b8f8c",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    width: Dimensions.get("window").width * 0.8,
    fontSize: 16,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#fff",
  },
  dropDown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    height: 45,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  dropDownContainer: {
    borderRadius: 8,
  },
  dropDownPlaceholder: {
    color: "#9ca3af",
    fontSize: 16,
  },
  dropDownText: {
    color: "#333", // Darker text for better readability
    fontSize: 16,
  },
});

export default MTV;
