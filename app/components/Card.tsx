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

const Card = (width: { width: number }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const navigateToProductView = () => {
    router.push("/components/ProductView");
  };
  return (
    <TouchableOpacity>
      <Pressable
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={[
          styles.card,
          { backgroundColor: isHovered ? "darkgrey" : "lightgrey" },
          { width: width.width },
        ]}
        onPress={navigateToProductView}
      >
        <Image
          source={require("../assets/images/astronaut.jpg")}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text
            style={[
              styles.bottomText,
              { color: isHovered ? "lightblue" : "white" },
            ]}
          >
            {isHovered ? "View Details" : "Product Name"}
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
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    overflow: "hidden",
    position: "relative",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomText: {
    position: "absolute",
    bottom: 10,
    fontSize: 18,
    textAlign: "center",
  },
});
