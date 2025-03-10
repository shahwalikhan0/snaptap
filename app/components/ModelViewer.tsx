import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";

const glbModelUrl =
  "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
const usdzModelUrl =
  "https://modelviewer.dev/shared-assets/models/Astronaut.usdz";

export default function ModelViewer() {
  const router = useRouter();
  // const navigateToProductView = () => {
  //   router.push("/product-view"); // Navigate to ProductView
  // };
  const [showWebView, setShowWebView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openAR = async () => {
    if (Platform.OS === "ios") {
      await WebBrowser.openBrowserAsync(usdzModelUrl);
    } else if (Platform.OS === "android") {
      setShowWebView(true);
    } else {
      Alert.alert("Device does not support AR.");
      console.log("Device does not support AR.");
    }
  };
  // const openAR = async () => {
  //   if (Platform.OS === "ios") {
  //     await WebBrowser.openBrowserAsync(usdzModelUrl);
  //     router.push("/product-view"); // Navigate to ProductView on iOS
  //   } else if (Platform.OS === "android") {
  //     setShowWebView(true);
  //     router.push("/product-view"); // Navigate to ProductView on Android
  //   } else {
  //     Alert.alert("Device does not support AR.");
  //     console.log("Device does not support AR.");
  //   }
  // };
  useEffect(() => {
    // setShowWebView(true);
  }, []);

  const htmlContent = `
    <html>
      <head>
        <script type="module" src="https://unpkg.com/@google/model-viewer"></script>
      </head>
      <body style="margin: 0; padding: 0; overflow: hidden;">
        <model-viewer
          src="${glbModelUrl}"
          ios-src="${usdzModelUrl}"
          ar ar-modes="scene-viewer webxr"
          camera-controls auto-rotate
          style="width: 100vw; height: 100vh;">
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <>
      <View style={styles.content}>
        {/* <Button title="Open in AR" onPress={navigateToProductView} /> */}

        {/* WebView Modal for Android */}
        <Modal visible={showWebView} animationType="slide">
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "black",
                alignSelf: "flex-end",
              }}
              onPress={() => setShowWebView(false)}
            >
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>

            <WebView
              source={{ html: htmlContent }}
              style={{ flex: 1 }}
              javaScriptEnabled
              domStorageEnabled
              allowsInlineMediaPlayback
              mixedContentMode="always"
            />
          </SafeAreaView>
        </Modal>
      </View>
      <Text
        style={[
          styles.bottomText,
          { color: isHovered ? "lightblue" : "white" },
        ]}
      >
        {isHovered ? "View Details" : "Product Name"}
      </Text>
    </>
  );
}
const styles = StyleSheet.create({
  cardView: {
    width: 150, // Match Card size
    height: 200, // Match Card size
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  bottomText: {
    position: "absolute",
    bottom: 10,
    fontSize: 18,
    textAlign: "center",
  },
});
