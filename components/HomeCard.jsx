import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import styles from "../assets/styles/home.styles";

export default function HomeCard({ item }) {
  return (
    <Link href={{
      pathname: `/home/${item.type}/round`,
      params: {type: item.type, param: item.param }
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
          {/* <Text style={styles.caption}>{item.name}</Text> */}
        </View>
      </Pressable>
    </Link>
  );
}
