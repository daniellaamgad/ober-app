
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRides } from "../../../context/rides-context";

const rideOptions = [
  { name: "OberX", description: "Affordable everyday rides", price: 120 },
  { name: "OberXL", description: "More space for your group", price: 200 },
];

export default function ChooseRideScreen() {
  const { pickup, destination } = useLocalSearchParams<{
    pickup: string;
    destination: string;
  }>();

  const [selected, setSelected] = useState("OberX");
  const [scheduledAt, setScheduledAt] = useState(
    new Date(Date.now() + 60 * 60 * 1000)
  );
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [showPicker, setShowPicker] = useState(false);

  const { addRide } = useRides();
  const router = useRouter();

  const selectedRide = rideOptions.find(
    (ride) => ride.name === selected
  )!;

  function onDateTimeChange(event: any, value?: Date) {
    if (Platform.OS !== "ios") {
      setShowPicker(false);
    }

    if (value) {
      setScheduledAt(value);
    }
  }

  function confirmRide() {
    if (scheduledAt.getTime() <= Date.now()) {
      Alert.alert("Invalid time", "Please choose a future date and time.");
      return;
    }

    addRide({
      id: Date.now().toString(),
      pickup: String(pickup ?? ""),
      destination: String(destination ?? ""),
      carType: selectedRide.name,
      price: selectedRide.price,
      date: new Date().toLocaleDateString(),
      scheduledAt: scheduledAt.toISOString(),
      status: "Scheduled",
    });

    Alert.alert("Ride Scheduled!", "Your ride has been added to My Trips.", [
      {
        text: "View My Trips",
        onPress: () => router.replace("/(tabs)/trips"),
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose your ride</Text>

      <View style={styles.locationBox}>
        <Text style={styles.label}>From</Text>
        <Text style={styles.location}>{pickup}</Text>
        <Text style={styles.label}>To</Text>
        <Text style={styles.location}>{destination}</Text>
      </View>

      <Text style={styles.sectionTitle}>When do you need a ride?</Text>

      <View style={styles.scheduleRow}>
        <Pressable
          style={styles.scheduleButton}
          onPress={() => {
            setPickerMode("date");
            setShowPicker(true);
          }}
        >
          <Text style={styles.label}>Date</Text>
          <Text style={styles.scheduleValue}>
            {scheduledAt.toLocaleDateString()}
          </Text>
        </Pressable>

        <Pressable
          style={styles.scheduleButton}
          onPress={() => {
            setPickerMode("time");
            setShowPicker(true);
          }}
        >
          <Text style={styles.label}>Time</Text>
          <Text style={styles.scheduleValue}>
            {scheduledAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={scheduledAt}
          mode={pickerMode}
          minimumDate={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateTimeChange}
        />
      )}

      {rideOptions.map((ride) => (
        <Pressable
          key={ride.name}
          onPress={() => setSelected(ride.name)}
          style={[
            styles.rideCard,
            selected === ride.name && styles.selectedCard,
          ]}
        >
          <View style={styles.rideInfo}>
            <Text style={styles.rideName}>{ride.name}</Text>
            <Text style={styles.description}>{ride.description}</Text>
          </View>
          <Text style={styles.price}>EGP {ride.price}</Text>
        </Pressable>
      ))}

      <Text style={styles.note}>
        Choose affordable ride.
      </Text>

      <Pressable style={styles.button} onPress={confirmRide}>
        <Text style={styles.buttonText}>
          Schedule Ride · EGP {selectedRide.price}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  locationBox: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  label: { color: "#666", fontSize: 13, marginBottom: 5 },
  location: { fontSize: 16, fontWeight: "600", marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  scheduleRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  scheduleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },
  scheduleValue: { fontSize: 15, fontWeight: "600", color: "#000" },
  rideCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedCard: { borderColor: "#000", borderWidth: 2 },
  rideInfo: { flex: 1, marginRight: 8 },
  rideName: { fontSize: 18, fontWeight: "bold" },
  description: { color: "#666", marginTop: 5 },
  price: { fontSize: 16, fontWeight: "bold" },
  note: { color: "#777", fontSize: 12, marginVertical: 16 },
  button: {
    backgroundColor: "#000",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
