import { MovieResponse, MovieResult } from "moviedb-promise/dist/request-types";
import React from "react";
import { StyleSheet, Image } from "react-native";

export default function MovieDetailsImage({
  movieFromProp,
  details,
}: {
  movieFromProp: MovieResult;
  details: MovieResponse;
}) {
  // For some reason, TMBD's discover endpoint and details endpoint
  // return different values for poster_path and backdrop_path
  // (i.e. discover would have the path but details wouldn't
  let propOrDetails: MovieResult | MovieResponse | undefined;
  const imageUrl = getImageUrl();

  function getImageUrl() {
    const baseUrl = "https://image.tmdb.org/t/p/original";

    if (details?.backdrop_path) {
      propOrDetails = details;
      return baseUrl + details.backdrop_path;
    } else if (movieFromProp.backdrop_path) {
      propOrDetails = movieFromProp;
      return baseUrl + movieFromProp.backdrop_path;
    } else if (details?.poster_path) {
      propOrDetails = details;
      return baseUrl + details.poster_path;
    } else if (movieFromProp.poster_path) {
      propOrDetails = movieFromProp;
      return baseUrl + movieFromProp.poster_path;
    }

    return null;
  }

  return (
    <Image
      style={styles.image}
      source={
        imageUrl
          ? {
              uri: imageUrl,
            }
          : require("../../assets/film-placeholder.png")
      }
      resizeMode={
        propOrDetails &&
        (propOrDetails.backdrop_path
          ? "cover"
          : propOrDetails.poster_path
          ? "contain"
          : "cover")
      }
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: 256,
    width: "100%",
  },
});
