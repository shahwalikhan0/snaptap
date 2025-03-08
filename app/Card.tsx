import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import ModelViewer from "./model-viewer";
import { useNavigation } from "@react-navigation/native";

const Card: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card}>
      <ModelViewer />
    </TouchableOpacity>
  );
};

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
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
