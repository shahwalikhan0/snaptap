import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerTitle: "SnapTap" }} />
      <Stack.Screen name="home" options={{ headerTitle: "SnapTap" }} />
      <Stack.Screen
        name="ProductView"
        options={{ headerTitle: "Product Details" }}
      />
      <Stack.Screen
        name="model-viewer"
        options={{ headerTitle: "3D Viewer" }}
      />
      <Stack.Screen name="left-menu" options={{ headerTitle: "Menu" }} />
    </Stack>
  );
}
