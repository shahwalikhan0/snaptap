import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import HomeHeader from "./components/HomeHeader";
import SideMenu from "./components/LeftMenu";
import Home from "./home";
import { UserDataType } from "./types/user-data";
import ProfileScreen from "./ProfileScreen";
import { MENU_ITEMS } from "./constants/menu-items";
import PaymentsScreen from "./PaymentsScreen";
import SettingsScreen from "./SettingsScreen";
import HelpScreen from "./HelpScreen";

const tempUserData: UserDataType = {
  name: "Shah",
  email: "ss",
};

export default function Index() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(MENU_ITEMS.HOME);
  const [userData, setUserData] = useState<UserDataType>(tempUserData);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleShowMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleFilterSelectedPage = (selectedItem: string) => {
    if (selectedItem === MENU_ITEMS.PROFILE) {
      return <ProfileScreen navigation={null} />;
    } else if (selectedItem === MENU_ITEMS.PAYMENT) {
      return <PaymentsScreen navigation={null} />;
    } else if (selectedItem === MENU_ITEMS.SETTINGS) {
      return <SettingsScreen navigation={null} />;
    } else if (selectedItem === MENU_ITEMS.HELP) {
      return <HelpScreen navigation={null} />;
    }
    return <Home />;
  };

  useEffect(() => {
    handleFilterSelectedPage(selectedItem);
    handleShowMenu();
    console.log("Selected Item: ", handleFilterSelectedPage(selectedItem));
  }, [selectedItem]);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader openMenu={handleShowMenu} />
      <ScrollView>{handleFilterSelectedPage(selectedItem)}</ScrollView>
      {/* Side Menu */}
      <SideMenu
        isVisible={menuVisible}
        closeMenu={handleShowMenu}
        setSelectedItem={setSelectedItem}
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
