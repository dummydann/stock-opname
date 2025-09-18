import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import styles from "../assets/styles/home.styles";

export default function RoundsCard({item, type, param}) {
  return (
   <Link href={`/home/${type}/round/${item.id}/${param}`} asChild>
      <Pressable style={styles.bookCard}>
        <Text>{item.name}</Text>
      </Pressable>
    </Link>
  )
}