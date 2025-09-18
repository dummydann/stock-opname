import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import styles from '../assets/styles/profile.styles';

export default function StypeCard({item, round}) {
  return (
    <Link
          href={`/home/wm/round/${round}/stype/${item}/klad`}
          style={{ textDecorationLine: "none" }}
        >
    <View style={styles.bookItem}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item}</Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          {item}
        </Text>
      </View>
    </View>
    </Link>
  )
}