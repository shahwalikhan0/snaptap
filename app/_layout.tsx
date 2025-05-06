import { Stack } from "expo-router";
import { UserProvider } from "./constants/user-context";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="pages/Home"
          options={{
            headerTitle: "SnapTap",
            gestureEnabled: false,
            animationTypeForReplace: "pop",
          }}
        />
        <Stack.Screen
          name="product-view"
          options={{ headerTitle: "Product Details" }}
        />
        <Stack.Screen
          name="pages/ProductView"
          options={{
            headerShown: true,
            headerTitle: "Product View",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="pages/ShowMore"
          options={{
            headerShown: true,
            headerTitle: "More Products",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="pages/Login"
          options={{
            headerShown: true,
            headerTitle: "Login",
            headerBackTitle: "Back",
          }}
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
        <Stack.Screen
          name="pages/NotificationDetail"
          options={{
            headerBackTitle: "Back",
            headerTitle: "Notification Detail",
            headerShown: true,
          }}
        />
      </Stack>
    </UserProvider>
  );
}
