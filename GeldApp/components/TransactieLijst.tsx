import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

interface Transaction {
  id: string;
  beschrijving: string;
  datumTijd: string;
  bedrag: number;
  typeTransactie: string;
  typeBiljet: number;
}

function TransactieLijst() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editBeschrijving, setEditBeschrijving] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [editBedrag, setEditBedrag] = useState("");
  const [editTypeTransactie, setEditTypeTransactie] = useState("");
  const [typeBiljet, setTypeBiljet] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openEen, setOpenEen] = useState(false);
  const [biljetten] = useState([
    { label: "5 EUR", value: "5" },
    { label: "10 EUR", value: "10" },
    { label: "20 EUR", value: "20" },
    { label: "50 EUR", value: "50" },
    { label: "100 EUR", value: "100" },
    { label: "200 EUR", value: "200" },
    { label: "500 EUR", value: "500" },
  ]);
  const [inkomenUitgaven] = useState([
    { label: "INKOMEN", value: "INKOMEN" },
    { label: "UITGAVEN", value: "UITGAVEN" },
  ]);

  async function fetchTransactions() {
    try {
      const existingTransactions = await AsyncStorage.getItem("@transactie");
      if (existingTransactions !== null) {
        setTransactions(JSON.parse(existingTransactions));
      }
    } catch (err) {
      console.log("Error retrieving data from AsyncStorage", err);
    }
  }

  useEffect(() => {
    fetchTransactions();
    const intervalDelete = setInterval(() => deleteTransaction, 2000);
    const intervalUpdate = setInterval(() => updateTransaction, 2000);
    const intervalTransactions = setInterval(() => fetchTransactions, 2000);
    return () => {
      clearInterval(intervalDelete);
      clearInterval(intervalUpdate);
      clearInterval(intervalTransactions);
    };
  }, []);

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditBeschrijving(transaction.beschrijving);
    setEditBedrag(transaction.bedrag.toString());
    setEditTypeTransactie(transaction.typeTransactie);
    setTypeBiljet(transaction.typeBiljet.toString());
    setModalVisible(true);
  };

  const updateTransaction = async () => {
    if (!selectedTransaction) return;

    const updatedTransactions = transactions.map((transaction: Transaction) =>
      transaction.id === selectedTransaction.id
        ? {
            ...transaction,
            beschrijving: editBeschrijving,
            bedrag: parseFloat(editBedrag) || 0,
            typeBiljet: parseInt(typeBiljet!) || transaction.typeBiljet,
            typeTransactie: editTypeTransactie,
          }
        : transaction
    );

    try {
      await AsyncStorage.setItem(
        "@transactie",
        JSON.stringify(updatedTransactions)
      );
      setTransactions(updatedTransactions);
      setModalVisible(false);
      Alert.alert("Succes", "Transactie bijgewerkt!");
    } catch (error) {
      console.error("Fout bij opslaan:", error);
    }
  };

  const deleteTransaction = async () => {
    if (!selectedTransaction) return;

    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => transaction.id !== selectedTransaction.id
    );

    try {
      await AsyncStorage.setItem(
        "@transactie",
        JSON.stringify(filteredTransactions)
      );
      setTransactions(filteredTransactions);
      setModalVisible(false);
      Alert.alert("Succes", "Transactie verwijderd!");
    } catch (error) {
      console.error("Fout bij verwijderen:", error);
    }
  };
  function Alles() {
    setFilteredTransactions(transactions);
  }
  function INKOMEN() {
    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => transaction.typeTransactie === "INKOMEN"
    );
    setFilteredTransactions(filteredTransactions);
  }
  function UITGAVEN() {
    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => transaction.typeTransactie === "UITGAVEN"
    );
    setFilteredTransactions(filteredTransactions);
  }
  return (
    <View style={styles.container}>
      <View style={styles.Soort}>
        <Pressable onPress={() => Alles} style={styles.Button}>
          <Text style={styles.buttonText}>Alles</Text>
        </Pressable>
        <Pressable onPress={INKOMEN} style={styles.Button}>
          <Text style={styles.buttonText}>INKOMEN</Text>
        </Pressable>
        <Pressable onPress={UITGAVEN} style={styles.Button}>
          <Text style={styles.buttonText}>UITGAVEN</Text>
        </Pressable>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => openModal(item)}>
            <View style={styles.transactionItem}>
              <View style={styles.row}>
                <Text style={styles.description}>{item.beschrijving}</Text>
                <Text style={styles.description}>{item.typeBiljet} EUR</Text>
                <Text style={styles.description}>{item.typeTransactie}</Text>
              </View>
              <Text
                style={[
                  styles.amount,
                  {
                    color: item.typeTransactie === "UITGAVEN" ? "red" : "green",
                  },
                ]}
              >
                {item.typeTransactie === "UITGAVEN" ? "-" : "+"}€
                {item.bedrag.toFixed(2)}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.noTransaction}>Geen transacties gemaakt</Text>
        }
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedTransaction && (
              <>
                <Text style={styles.modalTitle}>Transactie Details</Text>
                <TextInput
                  style={styles.input}
                  value={editBeschrijving}
                  onChangeText={setEditBeschrijving}
                  placeholder="Beschrijving"
                />
                <TextInput
                  style={styles.input}
                  value={editBedrag}
                  onChangeText={setEditBedrag}
                  keyboardType="numeric"
                  placeholder="Bedrag"
                />
                <DropDownPicker
                  open={openEen}
                  value={editTypeTransactie}
                  items={inkomenUitgaven}
                  setOpen={setOpenEen}
                  setValue={setEditTypeTransactie}
                  style={styles.dropdown1}
                  textStyle={styles.dropdownText}
                />
                <DropDownPicker
                  open={open}
                  value={typeBiljet}
                  items={biljetten}
                  setOpen={setOpen}
                  setValue={setTypeBiljet}
                  style={styles.dropdown}
                  textStyle={styles.dropdownText}
                />
                <Text style={styles.modalText}>
                  Datum: {selectedTransaction.datumTijd}
                </Text>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={updateTransaction}
                >
                  <Text style={styles.buttonText}>Opslaan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={deleteTransaction}
                >
                  <Text style={styles.buttonText}>Verwijderen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Sluiten</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  Soort: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dropdown1: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 8,
    zIndex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 8,
    zIndex: 0,
  },
  transactionItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  noTransaction: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  Button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 15,
    marginBottom: 5,
    width: "30%",
    fontSize: 16,
  },
});
export default TransactieLijst;