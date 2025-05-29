import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import Main from './components/Main';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
