import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { useUser } from "../hooks/useUserContext";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const context = useUser();
  const { setUser, user } = context;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setShowLoginForm(true);
      });
    }, 200);
  }, []);

  const handleLogin = async () => {
    const newErrors: typeof errors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/allow-customer-login/${username}/${password}`
      );

      if (response.data.id) {
        setUser(response.data);

        Alert.alert("Success", "Logged in successfully.");
        router.replace("/");
      } else {
        Alert.alert("Error", "Invalid username or password.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error;
        if (errorMessage === "User not found") {
          Alert.alert("Error", "Invalid username or password.");
        } else {
          Alert.alert("Error", "An error occurred during login.");
        }
        console.error("Login error:", errorMessage || error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!showLoginForm && (
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.avatar}
          />
        </Animated.View>
      )}

      {showLoginForm && (
        <>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.avatar}
          />
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.sign}>
            <Text style={styles.signtext}>Create a New Account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/pages/SignUpScreen")}
            >
              <Text style={styles.signupLink}>Sign-Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 SnapTap. All rights reserved.
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  sign: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signtext: {
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    fontSize: 14,
    color: "#00A8DE",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#e6f0fa",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0077cc",
    marginBottom: 30,
    textAlign: "center",
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
  loginButton: {
    backgroundColor: "#0077cc",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
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
  splashContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f0fa",
    zIndex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
});
