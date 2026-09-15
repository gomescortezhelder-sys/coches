import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Resultado() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    nombre?: string;
    correo?: string;
    telefono?: string;
    ciudad?: string;
  }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Reserva confirmada</Text>
        <Text style={styles.subtitulo}>Tu experiencia de conducción quedó registrada correctamente.</Text>

        <View style={styles.item}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{params.nombre ?? "No disponible"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{params.correo ?? "No disponible"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.value}>{params.telefono ?? "No disponible"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Ciudad</Text>
          <Text style={styles.value}>{params.ciudad ?? "No disponible"}</Text>
        </View>

        <Pressable style={styles.boton} onPress={() => router.push("/index")}>
          <Text style={styles.botonTexto}>Volver al inicio</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0b1020",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 3,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitulo: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 18,
    textAlign: "center",
  },
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fca5a5",
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    color: "#f8fafc",
    fontWeight: "500",
  },
  boton: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 12,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
