import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MovieDetailsReleaseDateProps } from "../../typings/MovieDetails.interface";

export default function MovieDetailsReleaseDate({
  releaseDate,
}: MovieDetailsReleaseDateProps) {
  if (!releaseDate) return null;

  return (
    <View style={styles.container}>
      <FontAwesome
        style={styles.icon}
        name="calendar"
        color="dodgerblue"
        size={24}
      />
      <Text style={styles.releaseDateText}>
        {new Date(releaseDate).toLocaleDateString()}
      </Text>
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
  releaseDateText: { fontSize: 20 },
});
