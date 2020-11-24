import { FontAwesome } from "@expo/vector-icons";
import { MovieResponse } from "moviedb-promise/dist/request-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../contexts/favorites.context";

export default function MovieDetailsFavoriteButton({
  details,
}: {
  details: MovieResponse;
}) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(details)}
      style={{ marginLeft: "auto", marginRight: 4, marginTop: -42 }}
    >
      <FontAwesome
        name={
          favorites.find((f: any) => f.id === details.id) ? "heart" : "heart-o"
        }
        color="#eb349e"
        size={36}
        style={{ marginRight: 6 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
