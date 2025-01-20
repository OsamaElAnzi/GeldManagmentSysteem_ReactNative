import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Modal, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SpaarInstellen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goal, setGoal] = useState<number | "">("");
    
    useEffect(() => {
        const fetchSpaardoel = async () => {
            try {
                const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
                if (existingSpaardoel) {
                    const parsedSpaardoel = JSON.parse(existingSpaardoel);
                    if (parsedSpaardoel.length > 0) {
                        setGoalName(parsedSpaardoel[0].name);
                        setGoal(parsedSpaardoel[0].amount);
                    }
                }
            } catch (error) {
                console.error("Error fetching spaardoel:", error);
            }
        };
        fetchSpaardoel();
    }, []);

    const handleUpdateSpaardoel = async () => {
        const parsedAmount = parseFloat(goal.toString());
        if (!goalName || isNaN(parsedAmount) || parsedAmount <= 0) {
            Alert.alert("Fout", "Vul een geldige naam en bedrag in!");
            return;
        }

        const updatedSpaardoel = [{ name: goalName, amount: parsedAmount }];

        try {
            await AsyncStorage.setItem("@spaardoel", JSON.stringify(updatedSpaardoel));
            setModalVisible(false);
            Alert.alert("Succes", "Spaardoel succesvol bijgewerkt!");
        } catch (error) {
            console.error("Error updating AsyncStorage:", error);
            Alert.alert("Fout", "Er is iets mis gegaan met het bijwerken van het spaardoel!");
        }
    };

    return (
        <>
            <Pressable style={styles.card} onPress={() => setModalVisible(true)}>
                <Text style={styles.cardText}>Spaardoel Instellen</Text>
            </Pressable>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Spaardoel Instellen</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Naam van je doel"
                            placeholderTextColor="#999"
                            value={goalName}
                            onChangeText={setGoalName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Je spaardoel (bedrag)"
                            placeholderTextColor="#999"
                            value={goal.toString()}
                            onChangeText={(text) => setGoal(text.replace(/[^0-9.]/g, "") ? parseFloat(text.replace(/[^0-9.]/g, "")) : "")}
                            keyboardType="numeric"
                        />
                        <Pressable style={styles.saveButton} onPress={handleUpdateSpaardoel}>
                            <Text style={styles.saveButtonText}>Bijwerken</Text>
                        </Pressable>
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Sluiten</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default SpaarInstellen;

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
        marginBottom: 10,
        marginHorizontal: 5,
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
    input: {
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        paddingVertical: 5,
        color: "#333",
        marginBottom: 20,
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: "#38B2AC",
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
});
