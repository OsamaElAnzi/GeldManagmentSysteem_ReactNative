import { Text, View, StyleSheet, Pressable } from 'react-native';

import SpaarInstellen from '@/components/SpaarInstellen';
import VermogenInstellen from '@/components/VermogenInstellen';

function settings() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <SpaarInstellen />
        <VermogenInstellen />
      </View>
    </View>
  );
}

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%', // Breedte van de rij
    marginVertical: 15, // Ruimte tussen rijen
  },
});
