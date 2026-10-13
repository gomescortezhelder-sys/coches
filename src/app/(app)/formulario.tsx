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

import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function Formulario() {
  const router = useRouter();
  const { session } = useAuth();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const correo = session?.user.email?.trim().toLowerCase() ?? "";
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  // Estado para controlar el proceso de guardado
  const [guardando, setGuardando] = useState(false);

  // Función para validar el correo electrónico
  const validarCorreo = (email: string) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  // Función para guardar los datos en Supabase
  const guardar = async () => {
    // Validar campos vacíos
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !ciudad.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validar correo
    if (!validarCorreo(correo)) {
      alert("Ingrese un correo electrónico válido");
      return;
    }

    // Validar teléfono
    if (isNaN(Number(telefono))) {
      alert("El teléfono debe contener solamente números");
      return;
    }

    // Validar longitud mínima del teléfono
    if (telefono.length < 7) {
      alert("Ingrese un número de teléfono válido");
      return;
    }

    try {
      // Activar indicador de carga
      setGuardando(true);

      // Guardar registro en Supabase
      const { data, error } = await getSupabase()
        .from("clientes_coche")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            ciudad: ciudad.trim(),
          },
        ])
        .select();

      // Comprobar si Supabase devolvió un error
      if (error) {
        console.log("ERROR SUPABASE:", error);
        alert("Error al guardar: " + error.message);
        return;
      }

      // Obtener el registro que acaba de crear Supabase
      const registro = data?.[0];

      if (!registro) {
        alert("No fue posible recuperar el registro guardado");
        return;
      }

      console.log("REGISTRO GUARDADO:", registro);

      // Navegar a la pantalla resultado
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

      // Limpiar formulario
      setNombre("");
      setTelefono("");
      setCiudad("");
    } catch (error) {
      console.log("ERROR INESPERADO:", error);
      alert(
        error instanceof Error
          ? `No fue posible guardar la información: ${error.message}`
          : "No fue posible guardar la información"
      );
    } finally {
      // Desactivar indicador de carga
      setGuardando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ENCABEZADO */}
      <View style={styles.encabezado}>
        <View style={styles.iconoContainer}>
          <Text style={styles.iconoCafe}>🚗</Text>
        </View>

        <Text style={styles.titulo}>Apex Performance</Text>

        <Text style={styles.subtitulo}>
          Registra tus datos para reservar tu prueba de manejo premium.
        </Text>
      </View>

      {/* FORMULARIO */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Datos del cliente</Text>

        <Text style={styles.cardDescripcion}>
          Completa todos los campos antes de confirmar tu prueba de conducción.
        </Text>

        {/* NOMBRE */}
        <Text style={styles.label}>Nombre</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingrese Nombre"
          placeholderTextColor="#A58B82"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        {/* CORREO */}
        <Text style={styles.label}>Correo electrónico</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: laura@gmail.com"
          placeholderTextColor="#A58B82"
          value={correo}
          editable={false}
          selectTextOnFocus
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.descripcionCorreo}>
          Este correo corresponde a la cuenta que inició sesión y se usará para encontrar tus
          reservas.
        </Text>

        {/* TELÉFONO */}
        <Text style={styles.label}>Teléfono</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: 3001234567"
          placeholderTextColor="#A58B82"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="numeric"
          maxLength={15}
        />

        {/* CIUDAD */}
        <Text style={styles.label}>Ciudad</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: Pasto"
          placeholderTextColor="#A58B82"
          value={ciudad}
          onChangeText={setCiudad}
          autoCapitalize="words"
        />

        {/* BOTÓN GUARDAR */}
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
            <Text style={styles.botonTexto}>Guardar información</Text>
          )}
        </Pressable>
      </View>

      {/* INFORMACIÓN */}
      <View style={styles.infoBox}>
        <View style={styles.infoIcono}>
          <Text style={styles.infoEmoji}>⚡</Text>
        </View>

        <View style={styles.infoContenido}>
          <Text style={styles.infoTitulo}>Drivers Club</Text>

          <Text style={styles.infoTexto}>
            Tu información quedará almacenada en Supabase para gestionar tu
            experiencia premium con nuestros deportivos.
          </Text>
        </View>
      </View>

      {/* PIE */}
      <Text style={styles.footer}>Apex Performance · Atelier Motors</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF8FB",
    padding: 20,
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
    backgroundColor: "#F5E7D7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  iconoCafe: {
    fontSize: 40,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 21,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5D5C3",
    elevation: 4,
  },

  cardTitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },

  cardDescripcion: {
    color: "#5B6473",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },

  label: {
    color: "#1F2937",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D8C3A5",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 17,
    color: "#111827",
    fontSize: 15,
  },
  descripcionCorreo: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 18,
    marginTop: -11,
    marginBottom: 16,
  },

  boton: {
    backgroundColor: "#D97706",
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
    backgroundColor: "#F5E7D7",
    padding: 17,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcono: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  infoEmoji: {
    fontSize: 23,
    color: "#D97706",
  },

  infoContenido: {
    flex: 1,
  },

  infoTitulo: {
    color: "#1F2937",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3,
  },

  infoTexto: {
    color: "#4B5563",
    fontSize: 13,
    lineHeight: 19,
  },

  footer: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 10,
  },
});
