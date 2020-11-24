import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MovieDetailsRuntimeProps } from "../../typings/MovieDetails.interface";

export default function MovieDetailsRuntime({
  runtime,
}: MovieDetailsRuntimeProps) {
  if (!runtime || runtime < 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="clock-o" color="green" size={24} />
      <Text style={styles.runtimeText}>{runtime} minutes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 8,
    marginVertical: 8,
  },
  icon: { marginRight: 6 },
  runtimeText: { fontSize: 20 },
});
