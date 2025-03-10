import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import HomeHeader from "./components/HomeHeader";
import SideMenu from "./components/LeftMenu";
import Home from "./home";
import ModelViewer from "./model-viewer";
import { UserDataType } from "./types/user-data";
import ProfileScreen from "./ProfileScreen";
import { MENU_ITEMS } from "./constants/menu-items";
import PaymentsScreen from "./PaymentsScreen";

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

  // const pageRoutes: { [key: string]: string } = {
  //   profile: "/ProfileScreen",
  //   payment: "/PaymentsScreen",
  //   settings: "/SettingsScreen",
  //   help: "/HelpScreen",
  // };

  // useEffect(() => {
  //   if (selectedItem in pageRoutes) {
  //     router.push(pageRoutes[selectedItem] as any);
  //   } else if (selectedItem === "logout") {
  //     console.log("Logging out...");
  //   }
  // }, [selectedItem]);

  //
  const handleFilterSelectedPage = (selectedItem: string) => {
    if (selectedItem === MENU_ITEMS.PROFILE) {
      return <ProfileScreen navigation={null} />;
    } else if (selectedItem === MENU_ITEMS.PAYMENT) {
      return <PaymentsScreen navigation={null} />;
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
      <View>{handleFilterSelectedPage(selectedItem)}</View>
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
