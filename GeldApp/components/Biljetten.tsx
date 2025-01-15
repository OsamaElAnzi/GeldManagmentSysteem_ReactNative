import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Transaction {
  id: string;
  beschrijving: string;
  bedrag: number;
  typeTransactie: string;
  typeBiljet: number;
}

function Biljetten() {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [soortBiljetten, setSoortBiljetten] = useState([
    { id: "1", label: "5 EUR", aantalBiljetten: 0, bedrag: 0 },
    { id: "2", label: "10 EUR", aantalBiljetten: 0, bedrag: 0 },
    { id: "3", label: "20 EUR", aantalBiljetten: 0, bedrag: 0 },
    { id: "4", label: "50 EUR", aantalBiljetten: 0, bedrag: 0 },
    { id: "5", label: "100 EUR", aantalBiljetten: 0, bedrag: 0 },
    { id: "6", label: "200 EUR", aantalBiljetten: 0, bedrag: 0 },
    { id: "7", label: "500 EUR", aantalBiljetten: 0, bedrag: 0 },
  ]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const existingTransactions = await AsyncStorage.getItem("@transactie");
        if (existingTransactions !== null) {
          const parsedTransactions: Transaction[] = JSON.parse(existingTransactions);
          setTransactions(parsedTransactions);
          calculateBiljetten(parsedTransactions);
        }
      } catch (err) {
        console.log("Error retrieving data from AsyncStorage", err);
      }
    }
    fetchTransactions();
  }, []);

  const calculateBiljetten = (transactions: Transaction[]) => {
    const updatedBiljetten = soortBiljetten.map((biljet) => ({
      ...biljet,
      aantalBiljetten: 0,
      bedrag: 0,
    }));

    transactions.forEach((transaction) => {
      const biljetIndex = updatedBiljetten.findIndex(
        (biljet) => biljet.label === `${transaction.typeBiljet} EUR`
      );

      if (biljetIndex !== -1) {
        updatedBiljetten[biljetIndex].aantalBiljetten += 1;
        updatedBiljetten[biljetIndex].bedrag += transaction.bedrag;
      }
    });

    setSoortBiljetten(updatedBiljetten);
  };

  const TableRow = ({
    item,
  }: {
    item: { id: string; label: string; aantalBiljetten: number; bedrag: number };
  }) => (
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>{item.label}</Text>
      <Text style={styles.rowText}>{item.aantalBiljetten}</Text>
      <Text style={styles.rowText}>{item.bedrag} EUR</Text>
    </View>
  );

  const TableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Soort biljet</Text>
      <Text style={styles.headerText}>Aantal biljetten</Text>
      <Text style={styles.headerText}>Totale bedrag</Text>
    </View>
  );

  return (
    <>
      <Pressable style={styles.card} onPress={() => setModalVisible(true)}>
        <Text style={styles.cardText}>Biljetten  Overzicht</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Biljetten Overzicht</Text>
            <TableHeader />
            <FlatList
              data={soortBiljetten}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TableRow item={item} />}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Sluiten</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default Biljetten;


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#3E4C59",
    width: "45%",
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E4C59",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
    color: "#333",
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#38B2AC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#e1b12c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#E53E3E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#3E4C59",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rowText: {
    fontSize: 10,
    color: "#3E4C59",
    textAlign: "center",
  },
});
