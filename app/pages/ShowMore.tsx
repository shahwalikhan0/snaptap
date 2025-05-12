import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text } from "@rneui/themed";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { ProductType } from "../types/product-type";
import Card from "../components/Card";

const ShowMore: React.FC = () => {
  const { sectionTitle } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.heading}>More in {sectionTitle}</Text>
      ),
    });
  }, [navigation, sectionTitle]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/products/${sectionTitle}`
        );
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

  const renderItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        router.push({
          pathname: "/pages/ProductView",
          params: { product: JSON.stringify(item) },
        })
      }
    >
      <Card
        data={item}
        width={Dimensions.get("window").width - 32}
        type="product"
      />
    </TouchableOpacity>
  );

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
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
    />
  );
};

const styles = StyleSheet.create({
  rowDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },

  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 12,
  },
  cardWrapper: {
    marginBottom: 10,
    alignItems: "center",
  },
  separator: {
    height: 8,
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
