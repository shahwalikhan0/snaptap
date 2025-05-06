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
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { useUser } from "../constants/user-context";

const { width } = Dimensions.get("window");
const context = useUser();

// const { user } = context;

const SideMenu = ({
  isVisible,
  closeMenu,
  setSelectedItem,
}: {
  isVisible: boolean;
  closeMenu: () => void;
  setSelectedItem: (item: string) => void;
}) => {
  const { user } = useUser(); // ✅ Hook used properly inside component

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
      useNativeDriver={true}
      style={styles.modal}
    >
      <ScrollView style={styles.sideMenuWrapper}>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: user?.image_url || "https://example.com/default.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.menuItemsWrapper}>
          <Text style={styles.menuTitle}>{user?.username || "Guest"}</Text>
          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => handleItemClick(MENU_ITEMS.PROFILE)}
          >
            <Icon name="user" size={20} color="black" type="font-awesome" />
            <Text>Personal Information</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsDivider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => handleItemClick(MENU_ITEMS.FAVOURITES)}
          >
            <Icon name="heart" size={15} color="red" type="font-awesome" />
            <Text>Favourites</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsDivider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => handleItemClick(MENU_ITEMS.SETTINGS)}
          >
            <Icon name="cog" size={20} color="black" type="font-awesome" />
            <Text>Settings</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsDivider} />

          <TouchableOpacity
            style={styles.menuItems}
            onPress={() => handleItemClick(MENU_ITEMS.HELP)}
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
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handleItemClick(MENU_ITEMS.HOME)}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
export default SideMenu;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  sideMenuWrapper: {
    width: width * 0.7,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
  },
  menuItemsWrapper: {
    flexGrow: 1,
    flexDirection: "column",
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
    justifyContent: "flex-end",
    paddingBottom: 20,
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
