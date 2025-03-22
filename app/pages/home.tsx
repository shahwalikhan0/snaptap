import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Divider } from "@rneui/themed";
import Card from "../components/Card";
import { useRouter } from "expo-router";

const sections = [
  { title: "Products" },
  { title: "Trending" },
  { title: "Brands" },
  { title: "New Arrivals" },
];

type Data = {
  modelName: string;
  productName: string;
  productId: string;
};

const Home: React.FC = () => {
  const router = useRouter();
  const [modelData, setModelData] = useState<Data[]>([]); // State to store model data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string>(); // State to track errors

  // Fetch model data from the server
  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await fetch("https://172.20.10.6:8002/modelData");
        if (!response.ok) {
          throw new Error("Failed to fetch model data");
        }
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.error("Error fetching model data:", error);
        setError("Failed");
      } finally {
        setLoading(false);
      }
    };

    fetchModelData();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.errorText}>Error: {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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

export default Home;
