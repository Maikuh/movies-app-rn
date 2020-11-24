import React from "react";
import { StyleSheet, Text } from "react-native";

export default function MovieDetailsHeader({ title }: { title: string }) {
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
