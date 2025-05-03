import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Text, Divider } from "@rneui/themed";
import Card from "../components/Card";
import { useRouter } from "expo-router";
import { BASE_URL } from "../constants/urls";
import { ProductType } from "../types/product-type";
import axios from "axios";
import HomeHeader from "../components/HomeHeader";
import { UserContext } from "../components/user-context";

const sections = [
  { title: "Products" },
  { title: "Trending" },
  { title: "Brands" },
  { title: "New-Arivals" },
];

const Home: React.FC = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const { user } = context;

  if (!user) console.log("no user");
  else console.log(user);
  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching model data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchModelData();
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {sections.map((section, index) => (
          <View key={index}>
            <Text style={styles.heading}>{section.title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {products.map((product: ProductType, i: number) => (
                <TouchableOpacity
                  key={i}
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

              <TouchableOpacity
                style={styles.showMore}
                onPress={() =>
                  router.push({
                    pathname: "/pages/ShowMore",
                    params: { section: section.title },
                  })
                }
              >
                <Text style={styles.showMoreText}>Show More</Text>
              </TouchableOpacity>
            </ScrollView>
            <Divider style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { paddingHorizontal: 10 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  showMore: {
    paddingHorizontal: 15,
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
  },
  showMoreText: { color: "white", fontSize: 16 },
  divider: { marginVertical: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
});

export default Home;
