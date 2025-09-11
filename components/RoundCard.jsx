import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import styles from "../assets/styles/home.styles";

export default function RoundCard({item, code}) {
  return (
   <Link href={{pathname: `/round/${code}`,
      params: { code: item.route, name: item.name, round_id: item.id },}} asChild>
      <Pressable style={styles.bookCard}>
        <Text>{item.name}</Text>
      </Pressable>
    </Link>
  )
}