import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FilterButtonProps } from "../../typings/FilterButton.interface";

export default function FilterButton({ onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome name="filter" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", padding: 8 },
});
