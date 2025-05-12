// app/(screens)/edit-profile.tsx
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon, Input } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUserContext";
import { BASE_URL } from "../constants/urls";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen() {
  const { user, setUser } = useUser();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuOpacity = useRef(new Animated.Value(0)).current;
  const [selectedImage, setSelectedImage] = useState<null | {
    uri: string;
    name: string;
    type: string;
  }>(null);
  const [editableUser, setEditableUser] = useState(user);
  const router = useRouter();
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
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access gallery is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const fileName =
        asset.fileName || asset.uri.split("/").pop() || "photo.jpg";
      const fileType = asset.type || "image/jpeg";

      setSelectedImage({
        uri: asset.uri,
        name: fileName,
        type: fileType,
      });
    }
  };

  const handleSave = async () => {
    if (!editableUser) return;

    const formData = new FormData();
    formData.append("id", editableUser.id.toString());
    formData.append("username", editableUser.username);
    formData.append("email", editableUser.email);
    formData.append("phone", editableUser.phone);

    if (selectedImage) {
      formData.append("image", {
        uri: selectedImage.uri,
        name: selectedImage.name,
        type: selectedImage.type,
      } as any);
    } else {
      const imageUri = Image.resolveAssetSource(
        require("@/assets/images/userprofile-icon.png")
      ).uri;
      const fileName = imageUri.split("/").pop() || "icon.png";
      const fileType = `image/${fileName.split(".").pop()}`;

      formData.append("image", {
        uri: imageUri,
        name: fileName,
        type: fileType,
      } as any);
    }
    try {
      const response = await fetch(`${BASE_URL}/api/users/update-user`, {
        method: "PUT",
        body: formData,
      });

      const text = await response.text();

      const result = JSON.parse(text);

      if (response.ok) {
        router.back();
        Alert.alert("Profile updated successfully!");
        console.log("Image sent:", selectedImage ?? "Default icon");
        setUser({ ...editableUser, image_url: user?.image_url });
        setUser(editableUser);
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{
                uri:
                  selectedImage?.uri ||
                  user?.image_url ||
                  editableUser?.image_url,
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
                    onPress={() => pickImage()}
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
          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Username:</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Input
                value={editableUser?.username}
                onChangeText={(text) => {
                  if (editableUser) {
                    setEditableUser({ ...editableUser, username: text });
                  }
                }}
                inputContainerStyle={styles.inputContainer}
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email:</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Input
                value={editableUser?.email}
                onChangeText={(text) => {
                  if (editableUser) {
                    setEditableUser({ ...editableUser, email: text });
                  }
                }}
                inputContainerStyle={styles.inputContainer}
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Phone:</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Input
                value={editableUser?.phone}
                onChangeText={(text) => {
                  if (editableUser) {
                    setEditableUser({ ...editableUser, phone: text });
                  }
                }}
                inputContainerStyle={styles.inputContainer}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleSave}
          >
            <Text style={styles.editProfileText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "flex-end",
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
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
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
  content: {
    alignItems: "center",
    marginTop: 20,
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
  editProfileButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  editProfileText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
