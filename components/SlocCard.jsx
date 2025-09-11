import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import styles from '../assets/styles/profile.styles';

export default function SlocCard({item, round}) {
  return (
    <Link
          href={{
            pathname: `/round/sloc/${item}`,
            params: { code: item, round: round },
          }}
          style={{ textDecorationLine: "none" }}
        >
    <View style={styles.bookItem}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item}</Text>
        <Text style={styles.bookCaption} numberOfLines={2}>
          {item}
        </Text>
        {/* <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text> */}
      </View>
    </View>
    </Link>
  )
}