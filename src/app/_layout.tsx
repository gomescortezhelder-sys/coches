import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0a0a0a",
        },
        headerTintColor: "#f5f5f5",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#070b12",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="formulario" options={{ title: "Reserva" }} />
      <Stack.Screen name="resultado" options={{ title: "Confirmación" }} />
      <Stack.Screen name="imagenes" options={{ title: "Galería" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
      <Stack.Screen name="menu" options={{ title: "Colección" }} />
      <Stack.Screen name="productos" options={{ title: "Accesorios" }} />
      <Stack.Screen name="explore" options={{ title: "Explorar" }} />
    </Stack>
  );
}
