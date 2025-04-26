import "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Divider } from "@rneui/themed";
import Card from "../components/Card";
import { useRouter } from "expo-router";
import { DB_BASE_URL } from "@env";
import axios from "axios";

const sections = [
  { title: "Products" },
  { title: "Trending" },
  { title: "Brands" },
  { title: "New Arrivals" },
];

type Data = {
  name: string;
  model_url: string;
  modelName: string;
  productName: string;
  productId: string;
};

const MainHome: React.FC = () => {
  const router = useRouter();
  const [modelData, setModelData] = useState<Data[]>([]); // State to store model data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string>(); // State to track errors

  const fetchProducts = async () => {
    try {
      const fullUrl = `${DB_BASE_URL}/api/products`;
      axios.get(fullUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await axios.get(fullUrl);
      if (!response.data) {
        throw new Error("No data found");
      }
      const data = response.data.map((item: any) => ({
        name: item.name,
        model_url: item.model_url,
        modelName: item.modelName,
        productName: item.productName,
        productId: item.productId,
      }));
      if (data.length === 0) {
        throw new Error("No products found");
      }
      setModelData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text>{modelData[0]?.model_url}</Text>
        {sections.map((section, index) => (
          <View key={index}>
            <Text style={styles.heading}>{section.title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {modelData &&
                modelData.map((model: Data, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      router.push({
                        pathname: "/pages/ProductView",
                        params: { modelName: model.modelName }, // Pass modelName from the model object
                      })
                    }
                  >
                    <Card data={model} width={150} />
                  </TouchableOpacity>
                ))}

              <TouchableOpacity style={styles.showMore}>
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
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
  showMoreText: { color: "white", fontSize: 16 },
  divider: { marginVertical: 15 },
});

export default MainHome;
