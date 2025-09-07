import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Detail() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen
        options={{
          title: id,
          headerLeft: () => {
            title: "tes";
          },
        }}
      />
      <Text>{id}</Text>
    </View>
  );
}
