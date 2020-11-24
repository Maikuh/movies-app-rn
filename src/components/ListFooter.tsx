import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function ListFooter() {
  return (
    <View
      style={{
        paddingVertical: 20,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <ActivityIndicator animating size="large" color="blue" />
    </View>
  );
}
