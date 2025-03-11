import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="pages/Home" options={{ headerTitle: "SnapTap" }} /> */}
      <Stack.Screen
        name="pages/ProductView"
        options={{
          headerShown: true,
          headerTitle: "Product Details",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen name="pages/Card" options={{ headerShown: false }} />
    </Stack>
  );
}
