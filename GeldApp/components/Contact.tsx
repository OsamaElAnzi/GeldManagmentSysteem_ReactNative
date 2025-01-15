import React, { useState } from "react";
import {
  Pressable,
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";

function InfoOverzicht() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable style={styles.card} onPress={() => setModalVisible(true)}>
        <Text style={styles.cardText}>Info Overzicht</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Contact Gegevens</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Naam:</Text>
              <Text style={styles.infoText}>Mr. El Anzi</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>E-mail:</Text>
              <Text style={styles.infoText}>osamelanzi0@gmail.com</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Telefoonnummer:</Text>
              <Text style={styles.infoText}>0685384810</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Locatie:</Text>
              <Text style={styles.infoText}>Utrecht, Overvecht</Text>
            </View>
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

export default InfoOverzicht;

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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "#25292e",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: "#888888",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "#ffffff",
  },
  closeButton: {
    backgroundColor: "#E53E3E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
