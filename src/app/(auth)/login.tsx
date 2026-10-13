import { getSupabase } from "@/lib/supabase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iniciarSesion = async () => {
    if (!correo.trim() || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    setGuardando(true);
    setError(null);
    try {
      const { error: loginError } = await getSupabase().auth.signInWithPassword({
        email: correo.trim(),
        password,
      });
      if (loginError) {
        throw loginError;
      }
      router.replace("/");
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.brandIcon}>
          <Text style={styles.cup}>🚘</Text>
        </View>
        <Text style={styles.eyebrow}>APEX PERFORMANCE · DRIVERS CLUB</Text>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.titleAccent}>de nuevo.</Text>
        <Text style={styles.subtitle}>
          Accede para reservar una prueba de manejo y descubrir nuestros deportivos exclusivos.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@correo.com"
            placeholderTextColor="#ad9ba3"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            accessibilityLabel="Correo electrónico"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu contraseña"
            placeholderTextColor="#ad9ba3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            textContentType="password"
            accessibilityLabel="Contraseña"
          />

          {error ? (
            <View accessibilityRole="alert" style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && !guardando && styles.pressed,
              guardando && styles.disabled,
            ]}
            onPress={iniciarSesion}
            disabled={guardando}
          >
            {guardando ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryText}>Iniciar sesión</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>¿Aún no tienes cuenta? </Text>
          <Link href="./registro" asChild>
            <Pressable>
              <Text style={styles.link}>Regístrate</Text>
            </Pressable>
          </Link>
        </View>
        <Text style={styles.footerNote}>Tu próxima prueba de manejo empieza aquí.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#05070b" },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 36,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  brandIcon: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: "#1a2332",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  cup: { fontSize: 34 },
  eyebrow: {
    color: "#f5d0a9",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: { color: "#f8fafc", fontSize: 34, fontWeight: "800", lineHeight: 39 },
  titleAccent: { color: "#f5d0a9", fontSize: 34, fontWeight: "800", lineHeight: 39 },
  subtitle: { color: "#cbd5e1", fontSize: 15, lineHeight: 23, marginTop: 12, marginBottom: 25 },
  card: {
    backgroundColor: "#101827",
    borderColor: "#2f3b4d",
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  label: { color: "#f8fafc", fontSize: 13, fontWeight: "700", marginBottom: 8 },
  input: {
    backgroundColor: "#0b1020",
    borderColor: "#3b4658",
    borderRadius: 14,
    borderWidth: 1,
    color: "#f8fafc",
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 17,
  },
  errorBox: {
    backgroundColor: "#321b25",
    borderColor: "#8d4256",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  errorText: { color: "#fecdd3", fontSize: 13, lineHeight: 19 },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#8e3b46",
    borderRadius: 15,
    justifyContent: "center",
    minHeight: 52,
    marginTop: 2,
  },
  primaryText: { color: "#ffffff", fontSize: 15, fontWeight: "800" },
  pressed: { opacity: 0.86 },
  disabled: { opacity: 0.62 },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 23 },
  footerText: { color: "#cbd5e1", fontSize: 14 },
  link: { color: "#f5d0a9", fontSize: 14, fontWeight: "800" },
  footerNote: { color: "#94a3b8", fontSize: 12, textAlign: "center", marginTop: 24 },
});
