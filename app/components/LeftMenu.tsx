import React from "react";
import { Icon } from "@rneui/themed";
import { MENU_ITEMS } from "../constants/menu-items";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";

const { width } = Dimensions.get("window");

export default function SideMenu({
  isVisible,
  closeMenu,
  setSelectedItem,
}: {
  isVisible: boolean;
  closeMenu: () => void;
  setSelectedItem: (item: string) => void;
}) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackdropPress={closeMenu}
      onBackButtonPress={closeMenu}
      style={styles.modal}
    >
      <View style={styles.sideMenuWrapper}>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.menuItemsWrapper}>
          <Text style={styles.menuText}>Side Menu</Text>

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => setSelectedItem(MENU_ITEMS.PROFILE)}
          >
            <Text>Profile</Text>
            <Icon name="user" size={20} color="black" type="font-awesome" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => setSelectedItem(MENU_ITEMS.SETTINGS)}
          >
            <Text>Settings</Text>
            <Icon name="cog" size={20} color="black" type="font-awesome" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
          <Icon name="close" size={20} color="red" type="font-awesome" />
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },
  sideMenuWrapper: {
    width: width * 0.7,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between", // Ensures space between elements
  },
  menuItemsWrapper: {
    marginTop: 20,
  },
  menuText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: "auto", // Pushes it to the bottom
    color: "red",
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center", // Centers the close button horizontally
  },
  menuItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    fontSize: 16,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: "50%",
  },
});
