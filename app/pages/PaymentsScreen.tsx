import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function PaymentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payments & Subscription</Text>

      {/* Your Data Section */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Your Data</Text>
        <Text style={styles.text}>Scans: 100</Text>
        <Text style={styles.text}>Scans Left: 20</Text>
        <Text style={styles.text}>Hit Count: 50</Text>
        <Text style={styles.text}>Start Date: 2025-01-01</Text>
        <Text style={styles.text}>Next Billing Date: 2025-02-01</Text>
        <Text style={styles.text}>Status: Active</Text>
      </View>

      {/* Subscription Section */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <Text style={styles.text}>Subscription Type: Premium</Text>
        <Text style={styles.text}>My Brand Name: SnapTap</Text>
        <Text style={styles.text}>Scans Left: 20</Text>
        <Text style={styles.text}>Subscription Price: $29.99</Text>
        <Text style={styles.text}>Per Hit Charge: $0.50</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionBox: {
    backgroundColor: "lightgrey",
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
