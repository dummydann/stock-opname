import { Text, View } from "react-native";

export default function renderItem({ item }) {
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          {/* <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          /> */}
          <Text style={styles.username}>{item}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        {/* <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        /> */}
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item}</Text>
        {/* <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View> */}
        <Text style={styles.caption}>{item}</Text>
        {/* <Text style={styles.date}>Shared on {formatPublishDate(item)}</Text> */}
      </View>
    </View>
  );
}
