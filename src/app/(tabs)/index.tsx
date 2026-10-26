
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const router = useRouter();

  function chooseRide() {
    if (!pickup.trim() || !destination.trim()) {
      alert("Please enter pickup and destination.");
      return;
    }

    router.push({
      pathname: "/ride/confirm",
      params: { pickup, destination },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Ober App</Text>
      <Text style={styles.title}>Where to?</Text>
      <Text style={styles.subtitle}>Plan your next ride.</Text>

      <Text style={styles.label}>Pickup location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pickup location"
        value={pickup}
        onChangeText={setPickup}
      />

      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        placeholder="Where are you going?"
        value={destination}
        onChangeText={setDestination}
      />

      <Pressable style={styles.button} onPress={chooseRide}>
        <Text style={styles.buttonText}>Choose a Ride</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  logo: { fontSize: 36, fontWeight: "bold", color: "#000" },
  title: { fontSize: 28, fontWeight: "bold", marginTop: 20 },
  subtitle: { color: "#666", marginTop: 8, marginBottom: 30 },
  label: { fontSize: 15, fontWeight: "600", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
