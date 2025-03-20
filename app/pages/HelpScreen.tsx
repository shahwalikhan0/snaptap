import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

export default function HelpSupportScreen({ navigation }: { navigation: any }) {
  const openMenu = () => {
    navigation.openDrawer?.();
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Help & Support</Text>

        <View style={styles.section}>
          <Text style={styles.subHeading}>Frequently Asked Questions</Text>

          <Text style={styles.question}>1. What is SnapTap?</Text>
          <Text style={styles.answer}>
            SnapTap enhances the online shopping experience through AR and 3D scanning.
          </Text>

          <Text style={styles.question}>2. How do I create a 3D scan?</Text>
          <Text style={styles.answer}>
            Open the app, select 'Scan Object', follow instructions, and let SnapTap generate your model.
          </Text>

          <Text style={styles.question}>3. How can I contact support?</Text>
          <Text style={styles.answer}>
            Email us at support@snaptap.com or visit our Help Center.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeading}>Need Further Assistance?</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
