import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import styles from "../assets/styles/home.styles";


export default function RoundCard({item}) {
  return (
   <Link href={`/menu/${item.id}`} asChild>
      <Pressable style={styles.bookCard}>
        <Text>{item.name}</Text>
      </Pressable>
    </Link>
  )
}