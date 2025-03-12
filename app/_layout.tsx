import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ headerTitle: "SnapTap" }} />
      <Stack.Screen
        name="product-view"
        options={{ headerTitle: "Product Details" }}
      />
      <Stack.Screen
        name="pages/ProductView"
        options={{ headerTitle: "Product Details" }}
      />
      <Stack.Screen
        name="model-viewer"
        options={{ headerTitle: "3D Viewer" }}
      />
      <Stack.Screen
        name="pages/Notification"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Notifications",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
