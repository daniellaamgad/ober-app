import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarLabel: "Home" }}
      />

      <Tabs.Screen
        name="trips"
        options={{ title: "Trips", tabBarLabel: "Trips" }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarLabel: "Profile" }}
      />
    </Tabs>
  );
}