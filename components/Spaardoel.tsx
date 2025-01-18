import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Spaardoel() {
    const [spaardoel, setSpaardoel] = useState<{ name: string; amount: number }[]>([]);

    useEffect(() => {
        const fetchSpaardoel = async () => {
            try {
                const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
                if (existingSpaardoel) {
                    const parsedSpaardoel = JSON.parse(existingSpaardoel);
                    setSpaardoel(parsedSpaardoel);
                }
            } catch (error) {
                console.error("Error fetching spaardoel:", error);
            }
        };

        fetchSpaardoel();
    }, []);

    return (
        <View style={styles.card}>
            {spaardoel.length > 0 ? (
                spaardoel.map((item: { name: string; amount: number }, index: number) => (
                    <View key={index} style={styles.goalContainer}>
                        <Text style={styles.goalTitle}>
                            {item.name ? item.name : "Voer je spaardoel in"}
                        </Text>
                        <Text style={styles.goalAmount}>€ {item.amount.toFixed(2)}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noGoalsText}>Geen spaardoelen ingesteld</Text>
            )}
        </View>
    );
}

export default Spaardoel;

const styles = StyleSheet.create({
    card: {
        width: "48%",
        backgroundColor: "#2980b9",
        padding: 15,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff",
        marginBottom: 5,
    },
    goalContainer: {
        marginBottom: 5,
    },
    goalName: {
        fontSize: 26,
        color: "#fff",
    },
    goalAmount: {
        fontSize: 20,
        color: "#f1c40f",
    },
    noGoalsText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        marginTop: 5,
    },
    goalTitle: {
        fontSize: 13,
        color: "#fff",
    }
});
