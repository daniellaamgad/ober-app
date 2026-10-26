
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>D</Text>
      </View>

      <Text style={styles.name}>Daniella</Text>
      <Text style={styles.email}>daniella@gmail.com</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Personal Information</Text>
        <View style={styles.divider} />

        <Text style={styles.field}>Full Name</Text>
        <Text style={styles.value}>Daniella Amgad</Text>

        <Text style={styles.field}>Email Address</Text>
        <Text style={styles.value}>daniella@gmail.com</Text>

        <Text style={styles.field}>Phone Number</Text>
        <Text style={styles.value}>+20 1223456789</Text>
      </View>

      <Text style={styles.footer}>Ober App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "bold" },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 16 },
  email: { color: "#666", marginTop: 6, marginBottom: 30 },
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 18,
  },
  label: { fontSize: 18, fontWeight: "bold" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 16 },
  field: { color: "#777", fontSize: 13, marginTop: 12 },
  value: { fontSize: 15, marginTop: 5 },
  footer: { color: "#888", fontSize: 12, marginTop: 30 },
});
