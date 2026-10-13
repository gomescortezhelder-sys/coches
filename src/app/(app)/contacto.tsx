import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Contacto() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Contacto</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Dirección</Text>
        <Text style={styles.value}>Autopista Norte 48, Bogotá</Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>+57 320 456 7890</Text>

        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>ventas@velocitymotors.com</Text>

        <Text style={styles.label}>Horario</Text>
        <Text style={styles.value}>Lunes a Domingo · 9:00 a.m. - 8:00 p.m.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0b1020",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 3,
  },
  label: {
    color: "#fca5a5",
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  value: {
    color: "#f8fafc",
    fontSize: 16,
    lineHeight: 24,
  },
});
