import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import styles from '../assets/styles/profile.styles';


export default function SlocCard({item, round}) {
  return (
    <Link
          href={{
            pathname: `/home/mm/round/${round}/sloc/${item.id}/klad`,
            params: { sloc: item.name }
          }}
        asChild>
      <Pressable>
        <View style={styles.container}>
        <View style={styles.bookItem}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.name}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}