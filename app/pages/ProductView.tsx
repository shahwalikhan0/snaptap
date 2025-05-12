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
import axios, { AxiosError } from "axios";
import { useUser } from "../hooks/useUserContext";
import { Modal, TextInput } from "react-native";
import { BASE_URL } from "../constants/urls";

const ProductView = () => {
  const { productID } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isFeedbackExisting, setIsFeedbackExisting] = useState(false);
  console.log(productID);

  const userId = isLoggedIn ? user?.id : "";

  useEffect(() => {
    const fetchProductAndFeedback = async () => {
      try {
        // Fetch product
        const response = await axios.get(
          `${BASE_URL}/api/products/product-detail/${productID}?userId=${userId}`
        );
        setProduct(response.data);

        // Fetch feedback
        if (userId && productID) {
          const feedbackResponse = await axios.get(
            `${BASE_URL}/api/feedbacks/user-feedback/${userId}/${productID}`
          );
          const feedback = feedbackResponse.data;
          if (feedback != null) {
            setUserRating(feedback.current_rating);
            setFeedbackTitle(feedback.title);
            setFeedbackMessage(feedback.message);
            setIsFeedbackExisting(true); // ✅ Feedback exists
          } else {
            setUserRating(0);
            setFeedbackTitle("");
            setFeedbackMessage("");
            setIsFeedbackExisting(false);
          }
        }
      } catch (error) {
        const err = error as AxiosError;
        console.error(
          "Error loading product or feedback:",
          err.response?.data || err.message
        );
        Alert.alert("Error", "Unable to load product or feedback.");
      } finally {
        setLoading(false);
      }
    };

    if (productID) {
      fetchProductAndFeedback();
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
  const handleStarPress = (rating: number) => {
    if (!isLoggedIn || !user?.id) {
      Alert.alert(
        "Login Required",
        "To add rating and feedback, you must log in first.",
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
    setUserRating(rating);
    setIsModalVisible(true);
  };
  const updateFeedback = async () => {
    if (!feedbackTitle || !feedbackMessage) {
      Alert.alert("Incomplete", "Please provide both title and message.");
      return;
    }

    try {
      const payload = {
        user_id: String(userId),
        product_id: String(productID),
        current_rating: userRating ?? 0,
        title: feedbackTitle,
        message: feedbackMessage,
      };

      console.log(payload);

      await axios.put(`${BASE_URL}/api/feedbacks/update`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Alert.alert("Updated", "Your feedback has been updated.");
      setIsModalVisible(false);
      setFeedbackTitle("");
      setFeedbackMessage("");
    } catch (error) {
      console.error("Feedback update failed:", error);
      Alert.alert("Error", "Could not update feedback. Please try again.");
    }
  };

  const submitFeedback = async () => {
    if (!feedbackTitle || !feedbackMessage) {
      Alert.alert("Incomplete", "Please provide both title and message.");
      return;
    }

    try {
      const payload = {
        user_id: String(userId),
        product_id: String(productID),
        current_rating: userRating ?? 0,
        title: feedbackTitle,
        message: feedbackMessage,
      };

      console.log(payload);

      await axios.post(`${BASE_URL}/api/feedbacks/create`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Alert.alert("Thank you!", "Your feedback has been submitted.");
      setIsModalVisible(false);
      setFeedbackTitle("");
      setFeedbackMessage("");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      Alert.alert("Error", "Could not submit feedback. Please try again.");
    }
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.modelContainer}>
        <WebView
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: product.model_url }}
          style={{ height: 300, width: "100%" }}
          startInLoadingState={true}
        />

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

      <ScrollView
        key="details-scroll"
        contentContainerStyle={styles.detailsContainer}
      >
        <View style={styles.card}>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
          >
            {product.name}
          </Text>

          <View style={styles.cardRow}>
            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                type="font-awesome"
                color="gold"
                size={18}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.ratingText}>{product.rating}</Text>
              {/* <Text style={styles.reviewText}>(10 reviews)</Text> */}
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
          <ScrollView
            style={styles.scrollDescription}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            <Text style={styles.descriptionText}>{product.description}</Text>
          </ScrollView>
        </View>

        <View style={styles.publisherCard}>
          <Text style={styles.sectionTitle}>Published By</Text>
          <View style={styles.publisherRow}>
            <Text style={styles.publisherName}>{product.brand_name}</Text>
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
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Submit Feedback</Text>
            <TextInput
              style={styles.input}
              placeholder="Feedback Title"
              value={feedbackTitle}
              onChangeText={setFeedbackTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Feedback Message"
              value={feedbackMessage}
              onChangeText={setFeedbackMessage}
              multiline
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={isFeedbackExisting ? updateFeedback : submitFeedback}
            >
              <Text style={styles.submitButtonText}>
                {isFeedbackExisting ? "Update" : "Submit"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductView;

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // ensure it's above other elements
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#00A8DE",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
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
    fontSize: 16,
    fontWeight: "500",
  },
  categoryBadge: {
    backgroundColor: "#00A8DE20",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#00A8DE",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    color: "#00A8DE",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  visitButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  visitButtonText: {
    color: "#00A8DE",
    fontSize: 16,
  },
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  scrollDescription: {
    maxHeight: 150,
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
  },
  publisherCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  publisherRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  publisherName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  publisherImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingInputCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    elevation: 2,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
});
