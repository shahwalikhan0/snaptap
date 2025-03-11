import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const openMenu = () => {
    navigation.openDrawer?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Settings Page</Text>
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
