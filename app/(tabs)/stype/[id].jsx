import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import styles from "../../../assets/styles/profile.styles";

export default function Detail() {
  const { id, code } = useLocalSearchParams();
  return (
    <View style={styles.emptyContainer}>
      <Stack.Screen options={{title: id}} />
      {/* <Ionicons
        name="add-circle-outlineaa"
        size={50}
        color={COLORS.textSecondary}
      /> */}
      {/* <Text style={styles.emptyText}>No count material yet</Text> */}
      <Link
        style={styles.addButton}
        href={{
            pathname: `/stype/count`,
            params: { code: id },
          }}
      >
        <Text style={styles.addButtonText}>Count Now</Text>
      </Link>
    </View>
  );
}
