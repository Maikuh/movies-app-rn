import React from "react";
import { StyleSheet, Text } from "react-native";
import { MovieDetailsHeaderProps } from "../../typings/MovieDetails.interface";

export default function MovieDetailsHeader({ title }: MovieDetailsHeaderProps) {
  return <Text style={styles.header}>{ title }</Text>;
}

const styles = StyleSheet.create({
  header: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
    marginTop: 12,
  },
});
