import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Divider, Icon } from "@rneui/themed";

const notificationsData = [
  {
    id: "1",
    sender: "Tassadaq",
    name: "Order Shipped",
    description: "Your order #1234 has been shipped!",
    image: require("@/assets/images/icon.png"),
    isRead: false,
  },
  {
    id: "2",
    sender: "Shah Wali",
    name: "New Offer",
    description: "Limited-time 50% discount on smartwatches!",
    image: require("@/assets/images/icon.png"),
    isRead: false,
  },
  {
    id: "3",
    sender: "Shah Wali",
    name: "Payment Received",
    description: "Payment of $199 received for Order #5678.",
    image: require("@/assets/images/icon.png"),
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const renderNotification = ({ item }: { item: any }) => (
    <View>
      <TouchableOpacity
        style={styles.notificationItem}
        onPress={() => {
          markAsRead(item.id);
          router.push({
            pathname: "/pages/NotificationDetail",
            params: {
              name: item.name,
              description: item.description,
              image: item.image,
              sender: item.sender,
            },
          });
        }}
      >
        <Image source={item.image} style={styles.notificationImage} />

        <View style={styles.notificationText}>
          <Text style={styles.notificationName}>{item.name}</Text>
          <Text style={styles.notificationDescription}>{item.description}</Text>
        </View>

        <Icon
          name={item.isRead ? "check-circle" : "circle"}
          type="font-awesome"
          color={item.isRead ? "green" : "red"}
          size={18}
        />
      </TouchableOpacity>
      <Divider />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.markAllContainer}>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllRead}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
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
});
