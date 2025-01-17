import { View, StyleSheet } from 'react-native';

import SpaarInstellen from '@/components/SpaarInstellen';
import VermogenInstellen from '@/components/VermogenInstellen';
import Biljetten from '@/components/Biljetten';
import Contact from '@/components/Contact';

//quote
import Quote from '@/components/Quote';
function settings() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <SpaarInstellen />
        <VermogenInstellen />
      </View>
      <View style={styles.row}>
        <Biljetten />
        <Contact />
      </View>
      <View style={styles.row}>
        <Quote />
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
    width: '90%',
    marginVertical: 15,
  },
});
