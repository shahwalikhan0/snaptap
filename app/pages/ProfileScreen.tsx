import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon, Input } from "@rneui/themed";
import { useUser } from "../hooks/useUserContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  const { user } = useUser(); // ✅ Access user from context
  const [menuVisible, setMenuVisible] = useState(false);
  const menuOpacity = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuOpacity, {
      toValue: menuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
      Animated.timing(menuOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{
                uri: user?.image_url,
              }}
              style={styles.icon}
            />
            <View style={styles.fabContainer}>
              <TouchableOpacity
                style={styles.fab}
                onPress={(event) => {
                  event.stopPropagation();
                  toggleMenu();
                }}
              >
                <Icon name="camera" type="feather" color="white" size={24} />
              </TouchableOpacity>
              {menuVisible && (
                <Animated.View style={[styles.menu, { opacity: menuOpacity }]}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => console.log("Upload Profile Picture")}
                  >
                    <Icon
                      name="upload"
                      type="feather"
                      color="black"
                      size={22}
                    />
                    <Text style={styles.menuText}>Upload Picture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => console.log("Delete Profile Picture")}
                  >
                    <Icon name="trash-2" type="feather" color="red" size={22} />
                    <Text style={[styles.menuText, { color: "red" }]}>
                      Delete Picture
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Username:</Text>
            </View>
            <Input
              value={user?.username}
              disabled
              containerStyle={styles.inputWrapper}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.value}
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email:</Text>
            </View>
            <Input
              value={user?.email}
              disabled
              containerStyle={styles.inputWrapper}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.value}
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Phone:</Text>
            </View>
            <Input
              value={user?.phone}
              disabled
              containerStyle={styles.inputWrapper}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.value}
            />
          </View>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => router.push("/pages/EditProfileScreen")}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  editProfileButton: {
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 30,
    borderRadius: 8,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  editProfileText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageWrapper: {
    position: "relative",
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 50,
  },
  fabContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "flex-end",
  },
  fab: {
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  content: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    width: "100%",
    marginVertical: 2,
    paddingHorizontal: 10,
  },
  labelContainer: {
    width: 100,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  inputWrapper: {
    flex: 1,
    paddingHorizontal: 0,
    top: -10,
  },
  inputContainer: {
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingHorizontal: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  menu: {
    position: "absolute",
    bottom: 60,
    right: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minWidth: 200,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
