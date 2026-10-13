import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const imagenes = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
];

export default function Imagenes() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Galería de deportivos</Text>
      <Text style={styles.subtitulo}>Explora una selección de modelos de alto rendimiento.</Text>

      {imagenes.map((url, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: url }} style={styles.imagen} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0b1020",
    padding: 18,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 6,
  },
  subtitulo: {
    color: "#cbd5e1",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 2,
  },
  imagen: {
    width: "100%",
    height: 220,
  },
});
