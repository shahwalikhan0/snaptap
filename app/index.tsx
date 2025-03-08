import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useColorScheme } from "react-native";
import { Link } from "expo-router";
import HomeHeader from "./home-header";
import SideMenu from "./left-menu";
import { MenuProvider } from "./MenuContext";
import Home from "./home";
import ModelViewer from "./model-viewer";

export default function Index() {
  const [menuVisible, setMenuVisible] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        {/* Fixed Header */}
        <HomeHeader openMenu={() => setMenuVisible(true)} />
        <Home />

        {/* Side Menu */}
        <SideMenu
          isVisible={menuVisible}
          closeMenu={() => setMenuVisible(false)}
        />
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingTop: 70, // Adjust based on the height of HomeHeader
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
