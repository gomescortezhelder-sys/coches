import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const enviar = () => {
    if (!nombre || !correo || !telefono || !ciudad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    router.push({
      pathname: "/resultado",
      params: {
        nombre,
        correo,
        telefono,
        ciudad,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Reserva de prueba de manejo</Text>
      <Text style={styles.subtitulo}>
        Completa tus datos para agendar tu experiencia con un deportivo premium.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@dominio.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="3001234567"
          keyboardType="numeric"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Bogotá"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Pressable style={styles.boton} onPress={enviar}>
          <Text style={styles.botonTexto}>Reservar prueba</Text>
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
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f8fafc",
    textAlign: "center",
  },
  subtitulo: {
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 3,
  },
  label: {
    color: "#fca5a5",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
    color: "#f8fafc",
  },
  boton: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
