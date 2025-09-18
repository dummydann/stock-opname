import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import styles from '../assets/styles/profile.styles';


export default function SlocCard({item, round}) {
  return (
    <Link
          href={`/home/mm/round/${round}/sloc/${item}/klad`}
        asChild>
      <Pressable>
        <View style={styles.container}>
        <View style={styles.bookItem}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}