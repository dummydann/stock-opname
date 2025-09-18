import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../../assets/styles/profile.styles";
import LogoutButton from "../../components/LogoutButton";
import ProfileHeader from "../../components/ProfileHeader";
import ThemeButton from "../../components/ThemeButton";

export default function Profile() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ProfileHeader />
      
      <ThemeButton />
      <LogoutButton />

      {/* YOUR RECOMMENDATIONS */}
      {/* <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Klad 📦</Text>
        <Text style={styles.booksCount}>0 Material</Text>
      </View> */}
    </View>
  );
}
