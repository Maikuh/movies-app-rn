import React from "react";
import { Text, StyleSheet } from "react-native";

export default function MovieCardTitle({ title }: { title: string | undefined }) {
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
