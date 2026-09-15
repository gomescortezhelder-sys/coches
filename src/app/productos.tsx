import { ScrollView, StyleSheet, Text, View } from "react-native";

const productos = [
  { nombre: "Kit Performance", descripcion: "Sistema de alto rendimiento para máxima aceleración y control." },
  { nombre: "Rines Carbono", descripcion: "Ligereza, estilo premium y mejor respuesta en curvas." },
  { nombre: "Escape Deportivo", descripcion: "Sonido más agresivo y experiencia sonora auténtica." },
];

export default function Productos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Accesorios premium</Text>

      {productos.map((producto) => (
        <View key={producto.nombre} style={styles.card}>
          <Text style={styles.nombre}>{producto.nombre}</Text>
          <Text style={styles.descripcion}>{producto.descripcion}</Text>
        </View>
      ))}
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
  nombre: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descripcion: {
    color: "#cbd5e1",
    lineHeight: 22,
  },
});
