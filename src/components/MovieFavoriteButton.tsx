import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { useFavorites } from "../contexts/favorites.context";
import { MovieFavoriteButtonProps } from "../typings/MovieFavoriteButton.interface";

export default function MovieFavoriteButton({
  movie,
  iconSize = 24,
  iconStyles = { marginRight: 6 },
  color = '#eb349e'
}: MovieFavoriteButtonProps) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <FontAwesome
      name={favorites.find((f: any) => f.id === movie.id) ? "heart" : "heart-o"}
      color={color}
      size={iconSize}
      style={iconStyles}
      onPress={() => toggleFavorite(movie)}
    />
  );
}

const styles = StyleSheet.create({});
