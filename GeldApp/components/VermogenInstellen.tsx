import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
    typeTransactie: "INKOMEN" | "UITGAVEN";
    bedrag: number;
  }

const VermogenInstellen = () => {
  const [vermogen, setVermogen] = useState<string>("€0.00");

  const [modalVisible, setModalVisible] = useState(false);
  const handleReset = async () => {
    try {
        await AsyncStorage.removeItem("@transactie");
        setModalVisible(false);
        Alert.alert("Succes", "Spaardoelen succesvol verwijderd!");
    } catch (error) {
        console.error("Error removing data from AsyncStorage:", error);
        Alert.alert("Fout", "Er is iets mis gegaan met het verwijderen van de spaardoelen!");
    }
}


  useEffect(() => {
    const fetchSaldo = async () => {
      console.log("Fetching saldo...");
      try {
        const existingTransactions = await AsyncStorage.getItem("@transactie");
        console.log("Existing Transactions for saldo:", existingTransactions);

        if (existingTransactions) {
          const transactions = JSON.parse(existingTransactions);
          const totalSaldo = transactions.reduce(
            (acc: number, transaction: Transaction) => {
              const bedrag =
                typeof transaction.bedrag === "number" ? transaction.bedrag : 0;
              return transaction.typeTransactie === "INKOMEN"
                ? acc + bedrag
                : acc - bedrag;
            },
            0
          );

          if (isNaN(totalSaldo)) {
            setVermogen("€0.00");
          } else {
            setVermogen(`€${totalSaldo.toFixed(2)}`);
          }

          console.log("Total Saldo:", totalSaldo);
        } else {
          setVermogen("€0.00");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setVermogen("Error loading data");
      }
    };

    fetchSaldo();
    const intertvalFetchSaldo = setInterval(fetchSaldo, 2000);
    return () => {
      clearInterval(intertvalFetchSaldo);
    };
  }, []);

  return (
    <>
      <Pressable style={styles.card} onPress={() => setModalVisible(true)}>
        <Text style={styles.cardText}>Vermogen   Bekijken</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Jouw vermogen</Text>
            <Text style={styles.modalText}>{vermogen}</Text>
            <Pressable
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.closeButtonText}>Reset</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Sluiten</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
  modalText: {
    color: "Dark",
    textAlign: "center",
    fontFamily: "PlayfairDisplay",
    fontSize: 34,
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#e1b12c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
},
});

export default VermogenInstellen;
