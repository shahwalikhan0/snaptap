import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ARModelViewer = ({ url }: { url: string }) => {
  return (
    <WebView
      source={{ uri: url }}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ARModelViewer;
