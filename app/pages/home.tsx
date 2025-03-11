import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Divider } from "@rneui/themed";
import Card from "../components/Card";

const sections = [
  { title: "Products" },
  { title: "Trending" },
  { title: "Brands" },
  { title: "New Arrivals" },
];

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {sections.map((section, index) => (
          <View key={index}>
            <Text style={styles.heading}>{section.title}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[...Array(5)].map((_, i) => (
                <Card key={i} />
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
  showMoreText: { color: "white", fontSize: 16 },
  divider: { marginVertical: 15 },
});

export default Home;
