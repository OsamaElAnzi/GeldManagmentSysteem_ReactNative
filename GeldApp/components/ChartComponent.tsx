import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Transaction = {
  bedrag: number;
  typeTransactie: string;
};

const ChartComponent = () => {
  const [percentage, setPercentage] = useState(0);
  const [vermogen, setVermogen] = useState(0);
  const [spaardoel, setSpaardoel] = useState<{ name: string; amount: number }[]>([]);
  const [saldo, setSaldo] = useState(0);
  const [nogTeGaan, setNogTeGaan] = useState<{ name: string; amount: number }[]>([]);

  useEffect(() => {
    const fetchSpaardoel = async () => {
      try {
        const existingSpaardoel = await AsyncStorage.getItem("@spaardoel");
        if (existingSpaardoel) {
          const parsedSpaardoel = JSON.parse(existingSpaardoel);
          setSpaardoel(parsedSpaardoel);

          if (parsedSpaardoel.length > 0) {
            const remainingAmount = parseFloat(parsedSpaardoel[0].amount) - saldo;
            setNogTeGaan([{ name: "Nog te gaan", amount: Math.max(remainingAmount, 0) }]);

            const progress = (saldo / parseFloat(parsedSpaardoel[0].amount)) * 100;
            setPercentage(Math.min(progress, 100));
          }
        }
      } catch (error) {
        console.error("Error fetching spaardoel:", error);
      }
    };

    fetchSpaardoel();
  }, [saldo]);

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const existingTransactions = await AsyncStorage.getItem("@transactie");
        if (existingTransactions) {
          const transactions: Transaction[] = JSON.parse(existingTransactions);
          const totalSaldo = transactions.reduce((acc, transaction) => {
            const bedrag = typeof transaction.bedrag === "number" ? transaction.bedrag : 0;
            return transaction.typeTransactie === "INKOMEN" ? acc + bedrag : acc - bedrag;
          }, 0);

          setSaldo(totalSaldo);
          setVermogen(parseFloat(totalSaldo.toFixed(2)));
        } else {
          setSaldo(0);
          setVermogen(0);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchSaldo();
  }, []);

  const radius = 60;
  const strokeWidth = 10;
  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <Svg width={diameter} height={diameter}>
        <G rotation="-90" origin={`${radius}, ${radius}`}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke="#3d5875"
            strokeWidth={strokeWidth}
            fill="none"
            strokeOpacity={0.3}
          />
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke="#00e0ff"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    padding: 20,
  },
  percentageText: {
    position: "absolute",
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});

export default ChartComponent;
