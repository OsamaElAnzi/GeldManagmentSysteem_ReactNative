import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChartComponent = () => {
  const [percentage, setPercentage] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('@transactie');
        if (storedValue) {
          setPercentage(Number(storedValue));
        }
      } catch (error) {
        console.log('Error retrieving data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gauge Chart</Text>
      
      <AnimatedCircularProgress
        size={250}
        width={20}
        fill={percentage} // Dynamically set the fill percentage
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
        style={styles.gauge}
      >
        {() => (
          <Text style={styles.percentageText}>
            {percentage}%
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#25292e',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  gauge: {
    marginTop: 10,
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ChartComponent;
