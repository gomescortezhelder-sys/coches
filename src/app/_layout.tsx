import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

function RootNavigator() {
  const { session, cargando, error, reloadSession } = useAuth();

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5d0a9" />
        <Text style={styles.message}>Restaurando sesión...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No se pudo iniciar la aplicación</Text>
        <Text style={styles.message}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={reloadSession}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#05070b",
  },
  title: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    color: "#cbd5e1",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 21,
  },
  retryButton: {
    marginTop: 22,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: "#8e3b46",
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
