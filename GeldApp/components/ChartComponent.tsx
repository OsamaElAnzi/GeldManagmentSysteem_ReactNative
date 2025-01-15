import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const ChartComponent = () => {
    const [percentage, setPercentage] = useState(75);

    useEffect(() => {
        const fetchPercentage = async () => {
            try {
            } catch (error) {
                console.log('Error retrieving percentage:', error);
            }
        };
        fetchPercentage();
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
            <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
        padding: 20,
    },
    percentageText: {
        position: 'absolute',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ChartComponent;
