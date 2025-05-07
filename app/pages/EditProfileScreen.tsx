// app/(screens)/edit-profile.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Input } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUserContext";

export default function EditProfileScreen() {
  const { user } = useUser();
  const [editableUser, setEditableUser] = useState(user);
  const router = useRouter();

  const handleSave = () => {
    console.log("Updated User Data", editableUser);
    router.back(); // go back after saving
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image source={{ uri: user?.image_url }} style={styles.icon} />
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

        <TouchableOpacity style={styles.editProfileButton} onPress={handleSave}>
          <Text style={styles.editProfileText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
