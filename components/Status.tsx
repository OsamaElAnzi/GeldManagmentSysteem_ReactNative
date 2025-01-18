import React from 'react';
import Spaardoel from './Spaardoel'
import NogTeGaan from './NogTeGaan'
import { StyleSheet, Text, View } from 'react-native';

function Status() {
  return (
    <View style={styles.container}>
        <View style={styles.cardContainer}>
            <NogTeGaan />
            <Spaardoel />
        </View>
    </View>
  );
}

export default Status;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});
