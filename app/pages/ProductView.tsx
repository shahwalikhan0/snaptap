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
import { useLocalSearchParams } from "expo-router";
import { ProductType } from "../types/product-type";

const ProductView = () => {
  const ip = "172.20.10.6";
  const { product } = useLocalSearchParams();

  const parsedProduct: ProductType | null = product
    ? JSON.parse(Array.isArray(product) ? product[0] : product)
    : null;
  const productWebsite = "https://example.com/product";
  const scrollY = useRef(new Animated.Value(0)).current;

  console.log("ProductView", parsedProduct);
  // Interpolate the WebView height
  const webViewHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: ["80%", "40%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {/* Directly load the model URL in WebView */}
      <Animated.View style={[styles.modelContainer, { height: webViewHeight }]}>
        <WebView
          source={{ uri: `${parsedProduct?.model_url}` }}
          style={styles.webView}
        />
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
        <Text style={styles.title}>{parsedProduct?.name}</Text>
        <Text style={styles.description}>
          This is a high-quality astronaut 3D model with AR support. Perfect for
          space enthusiasts and educational purposes.
        </Text>

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
