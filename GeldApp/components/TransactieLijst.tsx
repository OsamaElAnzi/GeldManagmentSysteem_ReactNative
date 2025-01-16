import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
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
    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => { setSelectedTransaction(item); setModalVisible(true); }}>
            <View style={styles.transactionItem}>
              <View style={styles.row}>
                <Text style={styles.description}>{item.beschrijving}</Text>
                <Text style={styles.description}>{item.typeBiljet} EUR</Text>
                <Text style={styles.description}>{item.typeTransactie}</Text>
              </View>
              <Text style={[styles.amount, { color: item.typeTransactie === 'UITGAVEN' ? 'red' : 'green' }]}>
                {item.typeTransactie === 'UITGAVEN' ? '-' : '+'}€
                {typeof item.bedrag === "number" && !isNaN(item.bedrag) ? item.bedrag.toFixed(2) : "0.00"}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.noTransaction}>Geen transacties gemaakt</Text>}
      />

      {/* Modal voor transactie details */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedTransaction && (
              <>
                <Text style={styles.modalTitle}>Transactie Details</Text>
                <Text style={styles.modalText}>Beschrijving: {selectedTransaction.beschrijving}</Text>
                <Text style={styles.modalText}>Bedrag: €{selectedTransaction.bedrag.toFixed(2)}</Text>
                <Text style={styles.modalText}>Type Biljet: {selectedTransaction.typeBiljet} EUR</Text>
                <Text style={styles.modalText}>Type Transactie: {selectedTransaction.typeTransactie}</Text>
                <Text style={styles.modalText}>Datum: {selectedTransaction.datumTijd}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Sluiten</Text>
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
  transactionItem: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Voor Android
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
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TransactieLijst;
