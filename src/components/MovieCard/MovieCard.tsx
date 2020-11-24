import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { MovieCardProps } from "../../typings/MovieCard.interface";
import MovieFavoriteButton from "../MovieFavoriteButton";
import MovieCardTitle from "./MovieCardTitle";
import MovieRatings from '../MovieRatings'

export default function MovieCard({ movie }: MovieCardProps) {
  const navigation = useNavigation();
  const isPlaceholder = (movie as any).placeholder;

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
      <View style={styles.contentContainer}>
        <Image
          style={styles.image}
          source={
            movie.poster_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
              : require("../../../assets/film-placeholder.png")
          }
        />

        <MovieCardTitle title={movie.title} />

        <View style={styles.bottomContainer}>
          <MovieRatings voteAverage={movie.vote_average} voteCount={movie.vote_count} />
          <MovieFavoriteButton movie={movie} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
    marginHorizontal: 8,
  },
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
