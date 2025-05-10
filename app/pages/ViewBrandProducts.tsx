import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { ProductType } from "../types/product-type";
import { BASE_URL } from "../constants/urls";
import Card from "../components/Card";

const ViewBrandProducts = () => {
  const { brandID, brandName } = useLocalSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(brandID, brandName);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Products by {brandName}
        </Text>
      ),
    });
  }, [navigation, brandName]);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/products/brand-id/${brandID}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error loading brand products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandID]);

  const renderItem = ({ item }: { item: ProductType }) => (
    <View style={styles.cardWrapper}>
      <Card
        data={item}
        width={Dimensions.get("window").width - 32}
        type="product"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Products by {brandName}</Text> */}
      {loading ? (
        <ActivityIndicator size="large" color="#0077cc" />
      ) : products.length === 0 ? (
        <Text style={styles.noResults}>No products found for this brand.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default ViewBrandProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f7f9fc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  cardWrapper: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  noResults: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 30,
  },
});
