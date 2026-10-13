import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

function RootNavigator() {
  const { session, cargando, error, reloadSession } = useAuth();

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#c87591" />
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
    backgroundColor: "#fff8fb",
  },
  title: {
    color: "#4b303d",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    color: "#745d69",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 21,
  },
  retryButton: {
    marginTop: 22,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: "#c87591",
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
