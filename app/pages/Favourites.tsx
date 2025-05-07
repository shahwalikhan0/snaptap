import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Card from "../components/Card";
import { ProductType } from "../types/product-type";
import { BASE_URL } from "../constants/urls";
import { useUser } from "../hooks/useUserContext";

export default function FavouritesScreen() {
  const [favorites, setFavorites] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const context = useUser();
  const { setUser, user } = context;
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/favorites/user-id/${user?.id}`
        );
        setFavorites(res.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/favorites/user-id/${user?.id}`
      );
      setFavorites(res.data);
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };
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
      <Card data={item} width={160} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0077cc"
          style={{ marginTop: 20 }}
        />
      ) : favorites.length === 0 ? (
        <Text style={styles.noResults}>No favorite products found.</Text>
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // backgroundColor: "#f7f9fc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  noResults: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 30,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardWrapper: {
    flex: 1,
    alignItems: "center",
    marginBottom: 8,
  },
});
