import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ProductType } from "../types/product-type";
import axios from "axios";
import { useUser } from "../hooks/useUserContext";

const BASE_URL = "https://snaptap.up.railway.app"; // <-- Your backend URL

const ProductView = () => {
  const { productID } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const router = useRouter();
  const { user, isLoggedIn } = useUser();

  const userId = isLoggedIn ? user?.id : "";
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/products/product-detail/${productID}?userId=${userId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        Alert.alert("Error", "Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productID) {
      fetchProduct();
    }
  }, [productID]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A8DE" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Product not found.
        </Text>
      </View>
    );
  }

  const handleFavoritePress = async () => {
    if (!isLoggedIn || !user?.id) {
      Alert.alert(
        "Login Required",
        "To add products to favorites, you must log in first.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => {
              router.push({ pathname: "/pages/Login" });
            },
          },
        ]
      );
      return;
    }

    try {
      const isCurrentlyFavorite = product?.is_favorite;
      const url = isCurrentlyFavorite
        ? `${BASE_URL}/api/favorites/unset-favorite/${user.id}/${product.id}`
        : `${BASE_URL}/api/favorites/set-favorite/${user.id}/${product.id}`;
      const method = isCurrentlyFavorite ? "delete" : "post";

      await axios({ method, url });
      // Update local product state after backend success
      setProduct((prevProduct) =>
        prevProduct
          ? { ...prevProduct, is_favorite: !isCurrentlyFavorite }
          : prevProduct
      );

      Alert.alert(
        "Success",
        !isCurrentlyFavorite ? "Added to favorites" : "Removed from favorites"
      );
    } catch (error) {
      console.error("Favorite toggle failed:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleStarPress = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modelContainer}>
        <WebView source={{ uri: product.model_url }} style={styles.webView} />

        <TouchableOpacity
          style={styles.favoriteFloatingButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Icon
            name="heart"
            type="font-awesome"
            color={product.is_favorite ? "#00A8DE" : "gray"}
            size={28}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.cardRow}>
            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                type="font-awesome"
                color="gold"
                size={18}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingText}>4.6</Text>
              <Text style={styles.reviewText}>(10 reviews)</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          {product.price && (
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          )}

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.visitButton}
            onPress={() => Linking.openURL("https://example.com/product")}
          >
            <Icon
              name="globe"
              type="font-awesome"
              color="#00A8DE"
              size={16}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.visitButtonText}>Visit Website</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        <View style={styles.publisherCard}>
          <Text style={styles.sectionTitle}>Published By</Text>
          <View style={styles.publisherRow}>
            <Text style={styles.publisherName}>Natalie</Text>
            {product.image_url && (
              <Image
                source={{ uri: product.image_url }}
                style={styles.publisherImage}
                resizeMode="cover"
              />
            )}
          </View>
        </View>

        <View style={styles.ratingInputCard}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
                activeOpacity={0.7}
              >
                <Icon
                  name="star"
                  type="font-awesome"
                  color={userRating >= star ? "gold" : "gray"}
                  size={30}
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductView;

ProductView.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(237, 237, 237)",
  },
  modelContainer: {
    width: "100%",
    height: 300,
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
    color: "#2e2e2e",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 18,
    color: "gold",
    fontWeight: "600",
    marginRight: 4,
  },
  reviewText: {
    fontSize: 16,
    color: "#7d7d7d",
  },
  categoryBadge: {
    backgroundColor: "#d1ecf9",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 14,
    color: "#0077cc",
    fontWeight: "500",
  },
  price: {
    fontSize: 26,
    color: "#555555",
    fontWeight: "bold",
    marginVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#00A8DE",
    marginVertical: 12,
  },
  visitButton: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00A8DE",
  },
  visitButtonText: {
    color: "#00A8DE",
    fontSize: 16,
    fontWeight: "600",
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
    color: "#555555",
    lineHeight: 22,
    textAlign: "left",
  },
  publisherCard: {
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
  publisherRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  publisherName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555555",
    marginRight: 10,
    flex: 1,
  },
  publisherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    color: "#2e2e2e",
    marginBottom: 10,
  },
});
