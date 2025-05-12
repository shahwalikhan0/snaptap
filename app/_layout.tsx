import { Stack } from "expo-router";
import { UserProvider } from "./hooks/useUserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="pages/home"
          options={{
            headerTitle: "SnapTap",
            animationTypeForReplace: "pop",
            gestureDirection: "horizontal",
            gestureEnabled: false, // This disables swipe-back on iOS
          }}
        />

        <Stack.Screen
          name="pages/EditProfileScreen"
          options={{
            headerShown: true,
            headerTitle: "Edit Profile",

            headerBackTitle: "Back",
          }}
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
          name="pages/Search"
          options={{
            headerShown: true,
            headerTitle: "Search",
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
        <Stack.Screen name="pages/Login" />

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
