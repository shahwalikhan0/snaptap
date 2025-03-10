import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import HomeHeader from "./components/HomeHeader";

export default function PaymentsScreen({ navigation }: { navigation: any }) {
  const openMenu = () => {
    navigation.openDrawer?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Payments & Subscription Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
