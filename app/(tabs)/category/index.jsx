// (tabs)/category/index.jsx
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function CategoryIndex() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pilih Category</Text>

      <Link href="/(tabs)/category/1" asChild>
        <Button title="Category 1" />
      </Link>

      <Link href="/(tabs)/category/2" asChild>
        <Button title="Category 2" />
      </Link>
    </View>
  );
}
