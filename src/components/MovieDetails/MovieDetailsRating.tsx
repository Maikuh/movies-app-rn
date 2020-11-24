import { FontAwesome } from "@expo/vector-icons";
import { MovieResponse } from "moviedb-promise/dist/request-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MovieDetailsRating({
  details,
}: {
  details: MovieResponse;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        marginLeft: 8,
        marginVertical: 8,
      }}
    >
      <FontAwesome
        name="star"
        color="red"
        size={24}
        style={{ marginRight: 6 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        {details.vote_average}
      </Text>
      <Text style={{ fontSize: 20 }}>&nbsp;({details.vote_count})</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
