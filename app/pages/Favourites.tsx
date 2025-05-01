import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { Text } from "@rneui/themed";
import Card from "../components/Card";

const screenWidth = Dimensions.get("window").width;
const cardMargin = 16;
const cardWidth = 180; // Base width for a card
const numColumns = Math.floor(screenWidth / (cardWidth + cardMargin));

export default function FavouritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Favourites</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search favourites..."
        />

        {/* Cards Grid */}
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.text}>Favourites</Text>
              <TextInput
                style={styles.searchBar}
                placeholder="Search favourites..."
              />
            </>
          }
          data={[...Array(10)]}
          numColumns={numColumns}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardContainer,
                { width: screenWidth / numColumns - cardMargin },
              ]}
            >
              <Card width={cardWidth} data={item} />
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  list: {
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
});
