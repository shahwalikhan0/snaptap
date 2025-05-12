import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { BASE_URL } from "../constants/urls";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState<null | {
    uri: string;
    name: string;
    type: string;
  }>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
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

    if (!result.canceled) {
      const asset = result.assets[0];
      const fileName = asset.uri.split("/").pop() || "photo.jpg";
      const fileType = asset.type
        ? `image/${fileName.split(".").pop()}`
        : "image/jpeg";

      setSelectedImage({
        uri: asset.uri,
        name: fileName,
        type: fileType,
      });
    }
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^\d{10,}$/.test(phone);

  const handleSignUp = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username must not contain spaces";
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // clear previous errors

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("password", formData.password);
    form.append("name", formData.username);

    if (selectedImage) {
      form.append("image", {
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

      form.append("image", {
        uri: imageUri,
        name: fileName,
        type: fileType,
      } as any);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/create-customer`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Account created successfully!");
        router.back();
      }
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Something went wrong."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage.uri }
              : require("@/assets/images/icon.png")
          }
          style={styles.avatar}
        />
        {/* )} */}
      </TouchableOpacity>

      <Text style={styles.imageHint}>
        Tap the image to select a profile picture
      </Text>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        placeholderTextColor="#999"
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        keyboardType="phone-pad"
        placeholderTextColor="#999"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={formData.password}
          placeholderTextColor="#999"
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Re-enter Password"
          value={formData.confirmPassword}
          placeholderTextColor="#999"
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 SnapTap. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  imageHint: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
    fontSize: 12,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 20,
    position: "relative",
  },
  fabContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  fab: {
    backgroundColor: "#00A8DE",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menu: {
    position: "absolute",
    top: -90,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#0077cc",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00A8DE",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#999",
  },
});
