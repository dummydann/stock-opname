import { Stack } from "expo-router";

export default function RoundLayout() {
  return (
    <Stack>
      <Stack.Screen name="[roundId]/stype/index" options={{ title: "Stype" }} />
      <Stack.Screen name="[roundId]/stype/[stypeId]/count" options={{ title: "Count" }} />
    </Stack>
  );
}
