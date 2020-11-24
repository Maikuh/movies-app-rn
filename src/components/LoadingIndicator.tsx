import React from "react";
import { ActivityIndicator } from "react-native";

export default function LoadingIndicator() {
  return (
    <ActivityIndicator
      size="large"
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      color="red"
    />
  );
}
