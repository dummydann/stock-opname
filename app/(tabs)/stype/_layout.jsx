import { Stack } from "expo-router";

export default function CategoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Storage Type" }} />
      <Stack.Screen name="[id]" options={{ title: "Detail Category" }} />
    </Stack>
  );
}
