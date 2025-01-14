import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function NogTeGaan() {
    const handleAddOrUpdateSpaardoel = async (goalId: string, goalName: string, goal: string) => {
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

            const index = spaardoel.findIndex(
                (item: {id: String, name: String, amount: number, date: String}) => item.id === spaardoelInfo.id
            );

            if (index !== -1) {
                spaardoel[index] = spaardoelInfo;
            } else {
                spaardoel.push(spaardoelInfo);
            }

            await AsyncStorage.setItem("@spaardoel", JSON.stringify(spaardoel));
            Alert.alert("Succes", "Spaardoel succesvol opgeslagen!");
        } catch (error) {
            console.error("Error saving to AsyncStorage:", error);
            Alert.alert("Fout", "Er is iets mis gegaan met het opslaan van het spaardoel!");
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Nog te gaan</Text>
            <Text style={styles.cardText}>{handleAddOrUpdateSpaardoel()}</Text>
        </View>
    );
}

export default NogTeGaan;

const styles = StyleSheet.create({
    card: {
        width: "45%",
        backgroundColor: "#2980b9",
        padding: 10,
        borderRadius: 10,
    },
    cardTitle: {
        fontWeight: "bold",
        color: "#ffff",
    },
    cardText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffff",
    },
});
