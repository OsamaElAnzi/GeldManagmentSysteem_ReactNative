import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ChartComponent = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Line Chart</Text>
      <LineChart
        data={{
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          datasets: [
            {
              data: [1, 2, 3, 10, 5, 6, 7, 8, 9, 10, 11, 12],
            },
          ],
        }}
        width={screenWidth - 60}
        height={200}
        yAxisLabel="$"
        yAxisSuffix="EUR"
        chartConfig={{
          backgroundColor: '#25292e',
          backgroundGradientFrom: '#25292e',
          backgroundGradientTo: '#25292e',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6', // Size of the dots on the line
            strokeWidth: '2',
            stroke: '#fff', // Color of dots
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ChartComponent;
