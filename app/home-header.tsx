import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

const HomeHeader: React.FC<{ openMenu: () => void }> = ({ openMenu }) => {
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
      <Text style={styles.title}>SnapTap</Text>

      {/* Right: Favorites Icon */}
      <TouchableOpacity
        onPress={() => console.log("Favorites clicked")}
        style={styles.iconButton}
      >
        <Icon name="heart" size={16} color="red" type="font-awesome" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("Notification clicked")}
        style={styles.iconButton}
      >
        <Icon name="bell" size={16} color="black" type="font-awesome" />
      </TouchableOpacity>
    </View>
  );
};

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
    width: 32,
    height: 32,
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

export default HomeHeader;
