import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text } from "@rneui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { ProductType } from "../types/product-type";
import Card from "../components/Card";

const cardWidth = (Dimensions.get("window").width - 40) / 2;

const ShowMore: React.FC = () => {
  const { section } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${section}`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.heading}>More in {section}</Text>
      <View style={styles.grid}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardWrapper}
            onPress={() =>
              router.push({
                pathname: "/pages/ProductView",
                params: { product: JSON.stringify(product) },
              })
            }
          >
            <Card data={product} width={150} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    marginBottom: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default ShowMore;
