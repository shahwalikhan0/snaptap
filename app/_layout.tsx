import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="pages/Home"
        options={{
          headerTitle: "SnapTap",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="product-view"
        options={{
          headerTitle: "Product Details",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pages/ProductView"
        options={{
          headerShown: false, // ❌ hide header so WebView can reach top
        }}
      />
      <Stack.Screen
        name="model-viewer"
        options={{
          headerTitle: "3D Viewer",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pages/Notification"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Notifications",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pages/NotificationDetail"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Notification Detail",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
