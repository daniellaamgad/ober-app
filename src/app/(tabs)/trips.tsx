
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRides } from "../../../context/rides-context";

export default function TripsScreen() {
  const { rides } = useRides();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Trips</Text>
      <Text style={styles.subtitle}>Rides History</Text>

      {rides.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No trips yet!</Text>
          <Text style={styles.emptyText}>
            Your confirmed rides will appear here.
          </Text>
        </View>
      ) : (
        rides.map((ride) => (
          
  <View key={ride.id} style={styles.card}>
    <View style={styles.row}>
      <Text style={styles.carType}>{ride.carType}</Text>
      <Text style={styles.price}>EGP {ride.price}</Text>
    </View>

    <Text style={styles.label}>Pickup</Text>
    <Text style={styles.location}>{ride.pickup}</Text>

    <Text style={styles.label}>Destination</Text>
    <Text style={styles.location}>{ride.destination}</Text>

    <Text style={styles.label}>Scheduled Date & Time</Text>
    <Text style={styles.location}>
      {new Date(ride.scheduledAt).toLocaleString()}
    </Text>

    <Text style={styles.status}>{ride.status}</Text>
  </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginTop: 10 },
  subtitle: { color: "#666", marginTop: 6, marginBottom: 24 },
  emptyCard: {
    backgroundColor: "#f5f5f5",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  emptyTitle: { fontSize: 18, fontWeight: "bold" },
  emptyText: { color: "#666", marginTop: 8, textAlign: "center" },
  card: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  carType: { fontSize: 18, fontWeight: "bold" },
  price: { fontWeight: "bold", fontSize: 16 },
  label: { color: "#777", fontSize: 13, marginTop: 8 },
  location: { fontSize: 15, marginTop: 4 },
  date: { color: "#777", fontSize: 12, marginTop: 16 },
  status: {
    color: "#16803d",
    fontWeight: "600",
    marginTop: 8,
  },
});
