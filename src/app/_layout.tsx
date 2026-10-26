import { Stack } from "expo-router";
import { RidesProvider } from "../../context/rides-context";
import "../../global.css";
export default function RootLayout() {
  return (
    <RidesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="ride/confirm" />
      </Stack>
    </RidesProvider>
  );
}