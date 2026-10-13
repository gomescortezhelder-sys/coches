import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#0b1020" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Apex Performance" }} />
      <Stack.Screen name="formulario" options={{ title: "Reserva" }} />
      <Stack.Screen name="resultado" options={{ title: "Confirmación" }} />
      <Stack.Screen name="registros" options={{ title: "Mis registros" }} />
      <Stack.Screen name="imagenes" options={{ title: "Galería" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
      <Stack.Screen name="menu" options={{ title: "Modelos" }} />
      <Stack.Screen name="productos" options={{ title: "Accesorios" }} />
      <Stack.Screen name="explore" options={{ title: "Explorar" }} />
    </Stack>
  );
}
