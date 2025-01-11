import { Text, View, StyleSheet } from 'react-native';
function settings() {
  return (
    <View
    style={styles.container}
    >
        <Text style={styles.test}>Settings Screen</Text>
    </View>
  )
}

export default settings

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
