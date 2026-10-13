import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Menu() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Modelos exclusivos</Text>

      <View style={styles.card}>
        <Text style={styles.itemTitulo}>Porsche 911 Turbo S</Text>
        <Text style={styles.itemTexto}>Potencia brutal, diseño icónico y precisión en cada curva.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.itemTitulo}>Ferrari F8 Tributo</Text>
        <Text style={styles.itemTexto}>Velocidad extrema, aerodinámica avanzada y emoción pura.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.itemTitulo}>Lamborghini Huracán</Text>
        <Text style={styles.itemTexto}>Un coupé agresivo con performance de competición y estilo impactante.</Text>
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
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 2,
  },
  itemTitulo: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemTexto: {
    color: "#cbd5e1",
    lineHeight: 22,
  },
});
