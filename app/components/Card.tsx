import React from "react";
import { TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import ModelViewer from "./ModelViewer";
import { useRouter } from "expo-router";

const Card: React.FC = () => {
  const router = useRouter();
  const navigateToProductView = () => {
    console.log("Navigating to ProductView");
    router.push("/components/ProductView"); // Navigate to ProductView
  };
  return (
    <TouchableOpacity style={styles.card} onPress={navigateToProductView}>
      <Pressable
      // onHoverIn={() => setIsHovered(true)}
      // onHoverOut={() => setIsHovered(false)}
      // style={[
      //   styles.cardView,
      //   { backgroundColor: isHovered ? "darkgrey" : "lightgrey" },
      // ]}
      >
        <Image
          source={require("@/assets/images/astronaut.jpg")}
          style={styles.image}
        />
      </Pressable>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    backgroundColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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
});
