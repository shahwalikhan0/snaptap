import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Animated,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import React, { useRef, useState } from "react";

const ProductView = () => {
  const glbModelUrl =
    "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  const usdzModelUrl =
    "https://modelviewer.dev/shared-assets/models/Astronaut.usdz";
  const productWebsite = "https://example.com/product";
  const [showWebView, setShowWebView] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolate the WebView height
  const webViewHeight = scrollY.interpolate({
    inputRange: [0, 300], // Scroll range
    outputRange: ["80%", "40%"], // Start large, shrink as user scrolls
    extrapolate: "clamp",
  });

  // Open AR based on platform
  const openAR = async () => {
    if (Platform.OS === "ios") {
      await WebBrowser.openBrowserAsync(usdzModelUrl);
    } else if (Platform.OS === "android") {
      setShowWebView(true);
    } else {
      Alert.alert("Device does not support AR.");
    }
  };

  // HTML for embedding 3D model using model-viewer
  const modelHtml = `
    <html>
      <head>
        <script type="module" src="https://unpkg.com/@google/model-viewer"></script>
        <style>
          body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; }
          .title-overlay {
            position: absolute;
            top: 20px;
            width: 100%;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          }
        </style>
      </head>
      <body>
        <div class="title-overlay">Astronaut Model</div>
        <model-viewer 
          src="${glbModelUrl}" 
          ios-src="${usdzModelUrl}" 
          ar ar-modes="scene-viewer webxr quick-look"
          camera-controls auto-rotate 
          style="width: 100vw; height: 80vh;">
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Animated WebView */}
      <Animated.View style={[styles.modelContainer, { height: webViewHeight }]}>
        <WebView source={{ html: modelHtml }} style={styles.webView} />
      </Animated.View>

      {/* Scrollable Product Details */}
      <Animated.ScrollView
        contentContainerStyle={styles.detailsContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>Astronaut Model</Text>
        <Text style={styles.description}>
          This is a high-quality astronaut 3D model with AR support. Perfect for
          space enthusiasts and educational purposes.
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={openAR}>
          <Text style={styles.buttonText}>🔍 View in AR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(productWebsite)}
        >
          <Text style={styles.buttonText}>🌐 Visit Website</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Astronaut Model</Text>
        <Text style={styles.description}>
          This is a high-quality astronaut 3D model with AR support. Perfect for
          space enthusiasts and educational purposes.
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={openAR}>
          <Text style={styles.buttonText}>🔍 View in AR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(productWebsite)}
        >
          <Text style={styles.buttonText}>🌐 Visit Website</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Astronaut Model</Text>
        <Text style={styles.description}>
          This is a high-quality astronaut 3D model with AR support. Perfect for
          space enthusiasts and educational purposes.
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={openAR}>
          <Text style={styles.buttonText}>🔍 View in AR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(productWebsite)}
        >
          <Text style={styles.buttonText}>🌐 Visit Website</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modelContainer: {
    width: "100%",
    backgroundColor: "#000",
  },
  webView: {
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
