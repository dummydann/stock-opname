import { Stack } from "expo-router";

export default function CountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Count Product" }} />
    </Stack>
  );
}
