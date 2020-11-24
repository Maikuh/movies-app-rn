import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MovieCardFavoriteButton({
  iconName,
  onPress,
}: {
  iconName: string;
  onPress: any;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <FontAwesome
        name={iconName}
        color="#eb349e"
        size={24}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: { marginRight: 6 },
});
