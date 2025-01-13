import {View, Text, StyleSheet} from 'react-native'
import TransactieLijst from "@/components/TransactieLijst";


function transacties() {
  return (
    <View
        style={styles.container}
        >
      <TransactieLijst />
    </View>
  )
}

export default transacties
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    test: {
        color: '#fff',
        fontSize: 24
    }
})