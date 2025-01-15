import React, { useState } from 'react'
import { Pressable, Modal, View, Text, TextInput, StyleSheet } from 'react-native'
function Contact() {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <Pressable
                    style={styles.card}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.cardText}>Contact</Text>
                </Pressable>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Contact gegevens</Text>
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
  )
}

export default Contact

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
})