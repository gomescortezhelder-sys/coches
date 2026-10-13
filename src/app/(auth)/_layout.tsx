import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff8fb" },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
    </Stack>
  );
}
