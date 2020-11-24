import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MovieCardRating({
  voteAverage,
}: {
  voteAverage: number | undefined;
}) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="star"
        color="red"
        size={18}
        style={{ marginRight: 6 }}
      />
      <Text>{voteAverage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
