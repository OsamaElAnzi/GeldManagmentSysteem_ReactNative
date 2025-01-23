import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactieLijst from '@/components/TransactieLijst';

const Transacties = () => {
    return (
        <View style={styles.container}>
            <TransactieLijst />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#25292e',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Transacties;