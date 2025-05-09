import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { ProductType } from "../types/product-type";
import { BASE_URL } from "../constants/urls";
import Card from "../components/Card";
import { useLocalSearchParams } from "expo-router"; // ⬅️ Add this at the top

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const { type } = useLocalSearchParams();
  const handleSearch = async () => {
    if (!searchKey.trim()) return;
    try {
      setLoading(true);
      const endpoint =
        type === "product"
          ? `${BASE_URL}/api/products/search/${searchKey.trim()}`
          : `${BASE_URL}/api/brands/search/${searchKey.trim()}`;
      const response = await axios.get(endpoint);
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ProductType }) => (
    <View style={styles.cardWrapper}>
      <Card data={item} width={Dimensions.get("window").width - 32} />
      {/* Full width with padding */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={[
          styles.searchInput,
          { borderColor: isFocused ? "#0077cc" : "#ccc" },
        ]}
        placeholder={`Search by ${
          type === "brand" ? "brand name" : "product name"
        }`}
        placeholderTextColor="#999"
        value={searchKey}
        onChangeText={setSearchKey}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0077cc"
          style={{ marginTop: 20 }}
        />
      ) : results.length === 0 && searchKey ? (
        <Text style={styles.noResults}>No products found.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f7f9fc",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
    marginBottom: 16,
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
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});
