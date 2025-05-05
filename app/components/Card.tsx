import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { ProductType } from "../types/product-type";

const Card = (props: { width: number; data: ProductType }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const navigateToProductView = () => {
    router.push({
      pathname: "/pages/ProductView",
      params: { product: JSON.stringify(props.data) },
    });
  };
  return (
    <TouchableOpacity>
      <Pressable
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={[styles.card, { width: props.width }]}
        onPress={navigateToProductView}
      >
        {/* Background Image */}
        {props.data.image_url && (
          <Image source={{ uri: props.data.image_url }} style={styles.image} />
        )}

        {/* Overlay */}
        <View style={styles.overlay}>
          <Text style={[styles.bottomText]}>
            {isHovered ? "View Details" : props.data.name}
          </Text>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: "#fff", // white background makes shadows visible
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    overflow: "visible", // IMPORTANT: allow shadow to show
    position: "relative",

    // Adjust shadow to make it visible around the whole card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 }, // Change offset to balance shadow above and below
    shadowOpacity: 0.2, // Increase opacity for a more prominent shadow
    shadowRadius: 15, // Larger radius for softer shadow edges
    elevation: 5, // Ensure shadow is visible on Android too
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // Ensure the image width is 100% of the card's width
    height: "100%", // Ensure the image height is 100% of the card's height
    resizeMode: "cover", // 'cover' ensures the image fills the card and maintains its aspect ratio
    borderRadius: 10, // If you want rounded corners like the card, make sure the image follows suit
    zIndex: 0, // Keep it behind the overlay text
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // text stays on top
  },
  bottomText: {
    position: "absolute",
    bottom: 10,
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
});
