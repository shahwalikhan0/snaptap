import { Icon } from "@rneui/themed";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MENU_ITEMS } from "../constants/menu-items";
import { useUser } from "../constants/user-context";

const HomeHeader: React.FC<{
  openMenu: () => void;
  setSelectedItem: (item: string) => void;
}> = ({ openMenu, setSelectedItem }) => {
  const router = useRouter();

  const context = useUser();

  const { user } = context;
  const isLoggedIn = !!user;

  const handleOpenMenu = () => {
    if (isLoggedIn) {
      openMenu();
    } else {
      Alert.alert("Error", "Please login!!!.");
    }
  };

  const handleNotificationPress = () => {
    if (isLoggedIn) {
      router.push({
        pathname: "/pages/Notification",
      });
    }
  };

  return (
    <View style={styles.header}>
      {/* Left: Open Menu */}
      <TouchableOpacity onPress={handleOpenMenu} style={styles.iconButton}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Center: Title */}
      <Text
        style={styles.title}
        onPress={() => setSelectedItem(MENU_ITEMS.HOME)}
      >
        SnapTap
      </Text>

      {/* Right: Favorites & Notification Icons */}
      <TouchableOpacity
        onPress={() => console.log("Searchbar clicked")}
        style={styles.iconButton}
      >
        <Icon name="search" size={19} color="#00A8DE" type="font-awesome" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNotificationPress}
        style={styles.iconButton}
      >
        <Icon name="bell" size={19} color="#00A8DE" type="font-awesome" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
