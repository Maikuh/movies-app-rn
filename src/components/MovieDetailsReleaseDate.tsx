import { FontAwesome } from "@expo/vector-icons";
import { MovieResponse } from "moviedb-promise/dist/request-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MovieDetailsReleaseDate({
  details,
}: {
  details: MovieResponse;
}) {
  return details?.release_date ? (
    <View style={styles.container}>
      <FontAwesome
        style={styles.icon}
        name="calendar"
        color="dodgerblue"
        size={24}
      />
      <Text style={styles.releaseDateText}>
        {new Date(details.release_date).toLocaleDateString()}
      </Text>
    </View>
  ) : null;
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
  releaseDateText: { fontSize: 20 }
});
