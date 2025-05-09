import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { MENU_ITEMS } from "../constants/menu-items";
import { useUser } from "../hooks/useUserContext";

const HomeHeader: React.FC<{
  openMenu: () => void;
  setSelectedItem: (item: string) => void;
}> = ({ openMenu, setSelectedItem }) => {
  const router = useRouter();
  const user = useUser();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenMenu = () => {
    if (user.isLoggedIn) {
      openMenu();
    } else {
      Alert.alert("Error", "Please login!!!.");
    }
  };

  const handleNotificationPress = () => {
    if (user.isLoggedIn) {
      router.push({
        pathname: "/pages/Notification",
      });
    } else {
      Alert.alert("Error", "Please login!!!.");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSearchOption = (type: "brand" | "product") => {
    setShowDropdown(false);
    console.log(type);
    router.push(`/pages/Search?type=${type}`);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
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

        {/* Right: Search & Notification Icons */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.iconButton}>
            <Icon name="search" size={19} color="#00A8DE" type="font-awesome" />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSearchOption("brand")}
              >
                <Text style={styles.dropdownText}>Search by Brand</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSearchOption("product")}
              >
                <Text style={styles.dropdownText}>Search by Product</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleNotificationPress}
          style={styles.iconButton}
        >
          <Icon name="bell" size={19} color="#00A8DE" type="font-awesome" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    zIndex: 10, // Ensure header stays on top of other elements
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
  searchContainer: {
    position: "relative", // Ensure the dropdown is relative to this container
  },
  dropdown: {
    position: "absolute",
    top: 45, // Adjust top so the dropdown appears below the search icon
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 999, // Ensure the dropdown is on top
    width: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontSize: 15,
    color: "#00A8DE",
  },
});
