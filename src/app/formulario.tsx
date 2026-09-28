import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [guardando, setGuardando] = useState(false);

  const validarCorreo = (email: string) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  const guardar = async () => {
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !ciudad.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!validarCorreo(correo)) {
      alert("Ingrese un correo electrónico válido");
      return;
    }

    if (isNaN(Number(telefono))) {
      alert("El teléfono debe contener solamente números");
      return;
    }

    if (telefono.length < 7) {
      alert("Ingrese un número de teléfono válido");
      return;
    }

    try {
      setGuardando(true);

      const { data, error } = await supabase
        .from("clientes_coches")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            ciudad: ciudad.trim(),
          },
        ])
        .select();

      if (error) {
        console.log("ERROR SUPABASE:", error);
        alert("Error al guardar: " + error.message);
        return;
      }

      const registro = data?.[0];

      if (!registro) {
        alert("No fue posible recuperar el registro guardado");
        return;
      }

      router.push({
        pathname: "/resultado",
        params: {
          id: String(registro.id),
          nombre: registro.nombre,
          correo: registro.correo,
          telefono: registro.telefono,
          ciudad: registro.ciudad,
        },
      });

      setNombre("");
      setCorreo("");
      setTelefono("");
      setCiudad("");
    } catch (error) {
      console.log("ERROR INESPERADO:", error);
      alert("No fue posible guardar la información");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.encabezado}>
        <View style={styles.iconoContainer}>
          <Text style={styles.iconoCafe}>🏎️</Text>
        </View>

        <Text style={styles.titulo}>Reserva de prueba de manejo</Text>
        <Text style={styles.subtitulo}>
          Completa tus datos para agendar tu experiencia con un deportivo premium.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Datos personales</Text>
        <Text style={styles.cardDescripcion}>
          Completa todos los campos antes de guardar la información.
        </Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#A58B82"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@dominio.com"
          placeholderTextColor="#A58B82"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="3001234567"
          placeholderTextColor="#A58B82"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="numeric"
          maxLength={15}
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Bogotá"
          placeholderTextColor="#A58B82"
          value={ciudad}
          onChangeText={setCiudad}
          autoCapitalize="words"
        />

        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
            guardando && styles.botonDesactivado,
          ]}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <View style={styles.cargandoContainer}>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.botonTexto}>Guardando...</Text>
            </View>
          ) : (
            <Text style={styles.botonTexto}>Reservar prueba</Text>
          )}
        </Pressable>
      </View>

      <Text style={styles.footer}>Tu reserva · Coches premium</Text>
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
  encabezado: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  iconoContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  iconoCafe: {
    fontSize: 38,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f8fafc",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    color: "#cbd5e1",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 21,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#374151",
    elevation: 4,
  },
  cardTitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 4,
  },
  cardDescripcion: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },
  label: {
    color: "#fca5a5",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#1f2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 17,
    color: "#f8fafc",
    fontSize: 15,
  },
  boton: {
    backgroundColor: "#ef4444",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 6,
    elevation: 2,
  },
  botonPresionado: {
    opacity: 0.85,
  },
  botonDesactivado: {
    opacity: 0.65,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  cargandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoBox: {
    backgroundColor: "#1f2937",
    padding: 17,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  infoIcono: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },
  infoEmoji: {
    fontSize: 23,
    color: "#fca5a5",
  },
  infoContenido: {
    flex: 1,
  },
  infoTitulo: {
    color: "#f8fafc",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3,
  },
  infoTexto: {
    color: "#d1d5db",
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 10,
  },
});
