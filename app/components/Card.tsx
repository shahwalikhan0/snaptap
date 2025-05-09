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
      params: { productID: JSON.stringify(props.data.id) },
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
        {/* Upper 60% - Image */}
        {props.data.image_url && (
          <Image source={{ uri: props.data.image_url }} style={styles.image} />
        )}

        {/* Lower 40% - Content */}
        <View style={styles.bottomContent}>
          <View style={styles.rowContent}>
            {/* Left Side - Text */}
            <View style={styles.textContainer}>
              <Text
                style={styles.nameText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.data.name}
              </Text>
              <Text
                style={styles.descriptionText}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {props.data.description}
              </Text>
            </View>

            {/* Right Side - Badge */}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{props.data.category}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "60%", // 60% for image
    resizeMode: "cover",
  },
  bottomContent: {
    height: "40%", // 40% for content
    backgroundColor: "#f0faff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: "#444",
  },
  categoryBadge: {
    backgroundColor: "#d1ecf9",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 14,
    color: "#0077cc",
    fontWeight: "500",
  },
  nameBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
});
