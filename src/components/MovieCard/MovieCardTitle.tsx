import React from "react";
import { Text, StyleSheet } from "react-native";
import { MovieCardTitleProps } from "../../typings/MovieCard.interface";

export default function MovieCardTitle({ title }: MovieCardTitleProps) {
  return (
    <Text style={styles.title} numberOfLines={3}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    flexWrap: "wrap",
    maxWidth: 128,
    textAlign: "center",
    marginVertical: 4,
  },
});
