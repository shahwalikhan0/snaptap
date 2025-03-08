import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";

const { width } = Dimensions.get("window");

export default function SideMenu({
  isVisible,
  closeMenu,
}: {
  isVisible: boolean;
  closeMenu: () => void;
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
      <View style={styles.sideMenu}>
        <Text style={styles.menuText}>Side Menu</Text>
        <TouchableOpacity onPress={closeMenu}>
          <Text style={styles.closeButton}>Close</Text>
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
  sideMenu: {
    width: width * 0.7,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  menuText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
});
