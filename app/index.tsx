import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useColorScheme } from "react-native";
import { Link } from "expo-router";
import HomeHeader from "./components/HomeHeader";
import SideMenu from "./components/LeftMenu";
import Home from "./home";
import ModelViewer from "./model-viewer";
import { UserDataType } from "./types/user-data";

const tempUserData: UserDataType = {
  name: "Shah",
  email: "ss",
};

export default function Index() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType>(tempUserData);
  const colorScheme = useColorScheme();

  const handleShowMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <HomeHeader openMenu={handleShowMenu} />
      <Home />
      {/* Side Menu */}
      <SideMenu
        isVisible={menuVisible}
        // closeMenu={() => setMenuVisible(false)}
        closeMenu={handleShowMenu}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingTop: 70,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
