import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, Divider, Icon } from "@rneui/themed";
import Card from "../components/Card";
import { useRouter } from "expo-router";
import { BASE_URL } from "../constants/urls";
import { ProductType } from "../types/product-type";
import axios from "axios";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useUser } from "../hooks/useUserContext";

const sections = [
  // { title: "Products" },
  { title: "Trending" },
  { title: "New-Arrivals" },
];

const Home: React.FC = () => {
  const context = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const rotation = useSharedValue(0);
  const { user } = context;
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

    // Start spinning animation
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

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
                      params: {
                        productID: JSON.stringify(product.id),
                      },
                    })
                  }
                >
                  <Card data={product} width={300} type="product" />
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.showMore}
                onPress={() =>
                  router.push({
                    pathname: "/pages/ShowMore", // Update this path to the relevant page for showing more
                    params: { sectionTitle: section.title }, // Pass section.title as parameter
                  })
                }
              >
                <Animated.View style={animatedStyle}>
                  <Icon
                    name="arrow-right"
                    type="font-awesome"
                    color="white"
                    size={20}
                  />
                </Animated.View>
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
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#00A8DE",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },

  divider: { marginVertical: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
});

export default Home;
