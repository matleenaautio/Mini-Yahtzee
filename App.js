import { View } from 'react-native';
import Footer from "./components/Footer";
import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import styles from "./style/style";
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    KanitRegular: require('./assets/fonts/Kanit-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header/>
      <Gameboard/>
      <Footer/>
    </View>
  );
}
