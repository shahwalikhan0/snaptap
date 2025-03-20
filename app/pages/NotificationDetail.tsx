import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function NotificationDetail() {
  const { name, description, image, sender } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      {/* Notificatiosn Image */}
      {image && (
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.image}
        />
      )}

      {/* Sender Name */}
      <Text style={styles.sender}>From: {sender}</Text>

      {/* Notification Title */}
      <Text style={styles.title}>{name}</Text>
      <ScrollView>
        {/* Notification Description */}
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
    alignItems: "center",
  },
  image: {
    marginTop: 20,

    width: 80,
    height: 80,
    marginBottom: 15,
    borderRadius: 40,
  },
  sender: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "600",
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 20,
  },
});
