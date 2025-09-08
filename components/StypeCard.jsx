import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import styles from '../assets/styles/profile.styles'

export default function StypeCard({item}) {
  return (
    <Link
          href={{
            pathname: `/stype/${item}`,
            params: { code: item },
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