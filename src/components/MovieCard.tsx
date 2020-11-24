import { useNavigation } from "@react-navigation/native";
import { MovieResult } from "moviedb-promise/dist/request-types";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useFavorites } from "../contexts/favorites.context";
import MovieCardFavoriteButton from "./MovieCardFavoriteButton";
import MovieCardRating from "./MovieCardRating";
import MovieCardTitle from "./MovieCardTitle";

export default function MovieCard({ movie }: { movie: MovieResult }) {
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation();
  const isPlaceholder = (movie as any).placeholder

  if (!movie) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetails", { movie })}
      style={{ ...styles.touchable, opacity: isPlaceholder && 0 }}
      disabled={isPlaceholder}
      activeOpacity={0.8}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Image
          style={styles.image}
          source={
            movie.poster_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
              : require("../../assets/film-placeholder.png")
          }
        />

        <MovieCardTitle title={movie.title} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "auto",
            marginHorizontal: 8,
          }}
        >
          <MovieCardRating voteAverage={movie.vote_average} />

          <MovieCardFavoriteButton
            iconName={
              favorites.find((f: any) => f.id === movie.id)
                ? "heart"
                : "heart-o"
            }
            onPress={() => toggleFavorite(movie)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2 / 3,
    justifyContent: "center",
    alignItems: "center",
    height: 256,
    borderRadius: 8,
  },
  touchable: {
    marginVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "white",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    borderRadius: 8,
  },
});
