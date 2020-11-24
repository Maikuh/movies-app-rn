import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MovieRatingsProps } from "../typings/MoveRatings.interface";

export default function MovieRatings({
  voteAverage,
  voteCount,
  containerStyles,
  fontSize = 14,
  iconSize = 18,
  color = "red",
}: MovieRatingsProps) {
  function Ratings() {
    if (voteAverage && voteCount && voteCount > 0) {
      return <>
        <Text style={{ ...styles.textVoteAverage, fontSize }}>{voteAverage}</Text>
        <Text style={{ fontSize }}>&nbsp;({voteCount})</Text>
      </>
    }
    else {
      return <Text>No ratings</Text>
    }
  }

  return (
    <View style={{ ...styles.container, ...(containerStyles as any) }}>
      <FontAwesome
        name="star"
        color={color}
        size={iconSize}
        style={styles.icon}
      />
      <Ratings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  icon: { marginRight: 6 },
  textVoteAverage: { fontWeight: "bold" },
});
