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

type Data = {
  modelName: string;
  productName: string;
  productId: string;
};

const Card = (props: { width: number; data: Data }) => {
  console.log(props.data);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const navigateToProductView = () => {
    const item = props.data;
    router.push({
      pathname: "/pages/ProductView",
      params: {
        modelName: item.modelName,
        // description: item.description,
        // image: item.image,
        // sender: item.sender,
      },
    });
  };
  return (
    <TouchableOpacity>
      <Pressable
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={[
          styles.card,
          { backgroundColor: isHovered ? "darkgrey" : "lightgrey" },
          { width: props.width },
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
            {isHovered ? "View Details" : props.data.modelName}
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
