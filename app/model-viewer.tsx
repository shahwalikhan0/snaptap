import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Button,
  Platform,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";

const glbModelUrl =
  "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
const usdzModelUrl =
  "https://modelviewer.dev/shared-assets/models/Astronaut.usdz";

export default function ModelViewer() {
  const [showWebView, setShowWebView] = useState(false);

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Model Viewer</Text>
      <Button title="Open in AR" onPress={openAR} />

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
            <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
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
  );
}
