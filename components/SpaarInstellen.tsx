import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Modal, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SpaarInstellen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [goalName, setGoalName] = useState("");
    const [goal, setGoal] = useState("");
    const [goalId, setGoalId] = useState<string | null>(null);
    const [savedGoals, setSavedGoals] = useState<{ id: string; name: string; amount: number; date: string }[]>([]);

    const resetForm = () => {
        setGoalName("");
        setGoal("");
        setGoalId(null);
    };

    const handleReset = async () => {
        try {
            await AsyncStorage.removeItem("@spaardoel");
            setSavedGoals([]);
            setModalVisible(false);
            Alert.alert("Succes", "Spaardoelen succesvol verwijderd!");
        } catch (error) {
            console.error("Error removing data from AsyncStorage:", error);
            Alert.alert("Fout", "Er is iets mis gegaan met het verwijderen van de spaardoelen!");
        }
    };

    const handleAddOrUpdateSpaardoel = async () => {
        if (!goalName || parseFloat(goal) <= 0) {
            Alert.alert("Vul een geldige naam en bedrag in!");
            return;
        }

        const spaardoelInfo = {
            id: goalId || new Date().toISOString(),
            name: goalName,
            amount: parseFloat(goal),
            date: new Date().toISOString(),
        };

        try {
            const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
            let spaardoel = existingSpaardoel ? JSON.parse(existingSpaardoel) : [];

            const index = spaardoel.findIndex((item: { id: string }) => item.id === spaardoelInfo.id);

            if (index !== -1) {
                spaardoel[index] = spaardoelInfo;
            } else {
                spaardoel.push(spaardoelInfo);
            }

            await AsyncStorage.setItem("@spaardoel", JSON.stringify(spaardoel));

            resetForm();
            setModalVisible(false);

            Alert.alert("Succes", "Spaardoel succesvol opgeslagen!");
            loadTransactions();
        } catch (error) {
            console.error("Error saving to AsyncStorage:", error);
            Alert.alert("Fout", "Er is iets mis gegaan met het opslaan van het spaardoel!");
        }
    };

    const loadTransactions = async () => {
        try {
            const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
            if (existingSpaardoel) {
                const parsedSpaardoelen = JSON.parse(existingSpaardoel);
                setSavedGoals(parsedSpaardoelen);
            }
        } catch (error) {
            console.error("Error loading transactions from AsyncStorage:", error);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <>
            <Pressable
                style={styles.card}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.cardText}>Spaardoel Instellen</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Spaardoel Instellen</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Naam van je doel"
                                placeholderTextColor="#999"
                                value={goalName}
                                onChangeText={setGoalName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Je spaardoel (bedrag)"
                                placeholderTextColor="#999"
                                value={goal}
                                onChangeText={setGoal}
                                keyboardType="numeric"
                            />
                        </View>
                        <Pressable
                            style={styles.saveButton}
                            onPress={handleAddOrUpdateSpaardoel}
                        >
                            <Text style={styles.saveButtonText}>Opslaan</Text>
                        </Pressable>
                        <Pressable
                            style={styles.resetButton}
                            onPress={handleReset}
                        >
                            <Text style={styles.saveButtonText}>Reset</Text>
                        </Pressable>
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

export default SpaarInstellen;

const styles = StyleSheet.create({
    savedGoalsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20,
    },
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
});

