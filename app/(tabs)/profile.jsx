import { View } from "react-native";
import styles from "../../assets/styles/profile.styles";
import LogoutButton from "../../components/LogoutButton";
import ProfileHeader from "../../components/ProfileHeader";
import ThemeButton from "../../components/ThemeButton";

export default function Profile() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      
      <ThemeButton />
      <LogoutButton />

      {/* YOUR RECOMMENDATIONS */}
      {/* <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>0 books</Text>
      </View> */}
    </View>
  );
}
