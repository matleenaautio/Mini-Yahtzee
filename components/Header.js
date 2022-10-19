import { Text, StyleSheet, View } from 'react-native';
import styles from '../style/style';

export default function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>
                Mini-Yahtzee
            </Text>
        </View>
    )
}