import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
  Image,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ProductType } from "../types/product-type";
import { useRouter } from "expo-router";

const ProductView = () => {
  const router = useRouter();

  const isLoggedIn = false; // Replace this with actual auth state

  const scrollY = useRef(new Animated.Value(0)).current;
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const { product } = useLocalSearchParams();
  const parsedProduct: ProductType | null = product
    ? JSON.parse(product as string)
    : null;

  const webViewHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [400, 200],
    extrapolate: "clamp",
  });

  if (!parsedProduct) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          No Product Data
        </Text>
      </View>
    );
  }

  const handleFavoritePress = () => {
    if (!isLoggedIn) {
      Alert.alert(
        "Login Required",
        "You need to log in or sign up to add this item to favorites.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => {
              router.push({
                pathname: "/pages/Login",
              });
            },
          },
        ]
      );
      return;
    }

    setIsFavorite(!isFavorite);
    Alert.alert(
      "Success",
      isFavorite ? "Removed from favorites" : "Added to favorites"
    );
  };

  const handleStarPress = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <View style={styles.container}>
      {/* Model Viewer */}
      <Animated.View style={[styles.modelContainer, { height: webViewHeight }]}>
        <WebView
          source={{ uri: parsedProduct.model_url }}
          style={styles.webView}
        />
        <TouchableOpacity
          style={styles.favoriteFloatingButton}
          onPress={handleFavoritePress}
        >
          <Text style={{ fontSize: 24 }}>{isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Product Details */}
      <Animated.ScrollView
        contentContainerStyle={styles.detailsContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{parsedProduct.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ 4.6</Text>
            <Text style={styles.reviewText}>(10 reviews)</Text>
          </View>
          {parsedProduct.price && (
            <Text style={styles.price}>${parsedProduct.price.toFixed(2)}</Text>
          )}
          <View style={styles.divider} />
          <Text style={styles.category}>
            Category: {parsedProduct.category}
          </Text>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {parsedProduct.description}
          </Text>
        </View>

        <View style={styles.publisherCard}>
          <Text style={styles.sectionTitle}>Published By</Text>
          <Text style={styles.publisherName}>Natalie</Text>
          {parsedProduct.image_url && (
            <Image
              source={{ uri: parsedProduct.image_url }}
              style={styles.publisherImage}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.ratingInputCard}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
              >
                <Text style={{ fontSize: 30, marginHorizontal: 5 }}>
                  {userRating >= star ? "⭐" : "☆"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.visitButton}
          onPress={() => Linking.openURL("https://example.com/product")}
        >
          <Text style={styles.visitButtonText}>🌐 Visit Website</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f0fa",
  },
  modelContainer: {
    width: "100%",
    backgroundColor: "#000",
    position: "relative",
  },
  webView: {
    flex: 1,
  },
  favoriteFloatingButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  detailsContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
    color: "#0077cc",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 18,
    color: "#f5a623",
    fontWeight: "600",
    marginRight: 6,
  },
  reviewText: {
    fontSize: 16,
    color: "#7d7d7d",
  },
  price: {
    fontSize: 26,
    color: "#e63946",
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#cce0f5",
    marginVertical: 12,
  },
  category: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
    marginBottom: 8,
  },
  descriptionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    textAlign: "left",
  },
  publisherCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  publisherName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  publisherImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginTop: 8,
  },
  ratingInputCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  starsRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0077cc",
    marginBottom: 10,
    textAlign: "left",
  },
  visitButton: {
    backgroundColor: "#0077cc",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  visitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
