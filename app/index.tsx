import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import HomeHeader from "./components/HomeHeader";
import SideMenu from "./components/LeftMenu";
import Home from "./pages/home";
import ModelViewer from "./components/ModelViewer";
import { UserDataType } from "./types/user-data";
import ProfileScreen from "./pages/ProfileScreen";
import { MENU_ITEMS } from "./constants/menu-items";
import PaymentsScreen from "./pages/PaymentsScreen";
import SettingsScreen from "./pages/SettingsScreen";
import HelpScreen from "./pages/HelpScreen";

const tempUserData: UserDataType = {
  name: "Shah",
  email: "ss",
};

export default function Index() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(MENU_ITEMS.HOME);

  const handleShowMenu = () => setMenuVisible(true);

  const handleHideMenu = () => setMenuVisible(false);

  const renderSelectedPage = () => {
    switch (selectedItem) {
      case MENU_ITEMS.PROFILE:
        return <ProfileScreen />;
      case MENU_ITEMS.PAYMENT:
        return <PaymentsScreen />;
      case MENU_ITEMS.SETTINGS:
        return <SettingsScreen navigation={null} />;
      case MENU_ITEMS.HELP:
        return <HelpScreen navigation={null} />;
      default:
        return <Home />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SideMenu
        isVisible={menuVisible}
        closeMenu={handleHideMenu}
        setSelectedItem={setSelectedItem}
      />
      <HomeHeader openMenu={handleShowMenu} setSelectedItem={setSelectedItem} />
      <ScrollView>{renderSelectedPage()}</ScrollView>
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
