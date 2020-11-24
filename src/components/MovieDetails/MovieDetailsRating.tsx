import { FontAwesome } from "@expo/vector-icons";
import { MovieResponse } from "moviedb-promise/dist/request-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MovieDetailsRatingProps } from "../../typings/MovieDetails.interface";

export default function MovieDetailsRating({
  details,
}: MovieDetailsRatingProps) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="star"
        color="red"
        size={24}
        style={styles.icon}
      />
      <Text style={styles.textVoteAverage}>
        {details.vote_average}
      </Text>
      <Text style={styles.textVoteCount}>&nbsp;({details.vote_count})</Text>
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
  textVoteAverage: { fontWeight: "bold", fontSize: 20 },
  textVoteCount: { fontSize: 20 }
});
