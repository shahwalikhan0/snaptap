import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MENU_ITEMS } from "../constants/menu-items";

const HomeHeader: React.FC<{
  openMenu: () => void;
  setSelectedItem: (item: string) => void;
}> = ({ openMenu, setSelectedItem }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* Left: Open Menu */}
      <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
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
        <Icon name="search" size={16} color="black" type="font-awesome" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/pages/Notification")}
        style={styles.iconButton}
      >
        <Icon name="bell" size={16} color="black" type="font-awesome" />
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
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
