import { Image } from "expo-image";
import { Text, View } from "react-native";
import styles from "../assets/styles/profile.styles";
import { formatMemberSince } from "../lib/utils.js";
import { useAuthStore } from "../store/authStore";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{
          uri: "https://stock-opname.devkftd.my.id/assets/img/avatars/1.png",
        }}
        style={styles.profileImage}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>
          🗓️ Joined {formatMemberSince(user.created_at)}
        </Text>
      </View>
    </View>
  );
}
