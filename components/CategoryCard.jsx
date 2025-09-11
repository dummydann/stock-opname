import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import styles from "../assets/styles/home.styles";

export default function CategoryCard({ item }) {
  return (
    <Link href={{
      pathname: "/round",
      params: { code: item.route, name: item.name }, 
    }} asChild>
      <Pressable style={styles.bookCard}>
        <View style={styles.bookImageContainer}>
          <Image
            source={item.picture}
            style={styles.bookImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.name}</Text>
          <Text style={styles.caption}>{item.name}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
