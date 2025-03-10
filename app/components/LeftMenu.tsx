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

const SideMenu = ({
  isVisible,
  closeMenu,
  setSelectedItem,
}: {
  isVisible: boolean;
  closeMenu: () => void;
  setSelectedItem: (item: string) => void;
}) => {
  // REMOVE THIS
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    closeMenu();
  };
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
            source={require("@/assets/images/userprofile-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.menuItemsWrapper}>
          <Text style={styles.menuTitle}>Profile</Text>
          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => setSelectedItem(MENU_ITEMS.PROFILE)}
          >
            <Icon name="user" size={20} color="black" type="font-awesome" />
            <Text>Personal Information</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsDivider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => setSelectedItem(MENU_ITEMS.PAYMENT)}
          >
            <Icon
              name="credit-card"
              size={15}
              color="black"
              type="font-awesome"
            />
            <Text>Payment & Subscriptions</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsDivider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => handleItemClick("settings")}
          >
            <Icon name="cog" size={20} color="black" type="font-awesome" />
            <Text>Settings</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsDivider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => handleItemClick("help")}
          >
            <Icon
              name="question-circle"
              size={20}
              color="black"
              type="font-awesome"
            />
            <Text>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerButtons}>
          {/* <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Icon name="close" size={30} color="red" type="font-awesome" />
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handleItemClick("logout")}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default SideMenu;

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
    justifyContent: "space-between",
  },
  menuItemsWrapper: {
    flex: 1,
    marginTop: 20,
  },
  menuTitle: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginTop: 10,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  menuItemsDivider: {
    borderBottomWidth: 0.8,
    borderBottomColor: "lightgrey",
    marginVertical: 10,
  },
  menuItems: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 10,
  },
  footerButtons: {
    alignItems: "center",
    paddingBottom: 20,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  logoutButton: {
    marginTop: 15,
    width: "80%",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    alignItems: "center",
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
  },
});
