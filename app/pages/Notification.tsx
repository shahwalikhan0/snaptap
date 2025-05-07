import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Divider, Icon } from "@rneui/themed";
import axios from "axios";
import { NotificationType } from "../types/notification-data";
import { BASE_URL } from "../constants/urls";
import { useUser } from "../hooks/useUserContext";

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const context = useUser();

  const { user } = context;
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/notifications/user-id/${user?.id}`
        );

        setNotifications(response.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, is_read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, is_read: true }))
    );
  };

  const renderNotification = ({ item }: { item: NotificationType }) => (
    <View>
      <TouchableOpacity
        style={styles.notificationItem}
        onPress={() => {
          markAsRead(item.id);
          router.push({
            pathname: "/pages/NotificationDetail",
            params: {
              name: item.title,
              description: item.message,
              image: "", // Optional: Add image if available
              sender: "SnapTap", // Placeholder, adjust if you have sender info
            },
          });
        }}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.notificationImage}
        />

        <View style={styles.notificationText}>
          <Text style={styles.notificationName}>{item.title}</Text>
          <Text style={styles.notificationDescription}>{item.message}</Text>
        </View>

        <Icon
          name={item.is_read ? "check-circle" : "circle"}
          type="font-awesome"
          color={item.is_read ? "green" : "red"}
          size={18}
        />
      </TouchableOpacity>
      <Divider />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.markAllContainer}>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllRead}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  markAllContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  markAllRead: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  notificationImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  notificationText: {
    flex: 1,
  },
  notificationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
