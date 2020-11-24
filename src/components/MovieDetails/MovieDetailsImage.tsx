import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  MovieResponseExtended,
  MovieResultExtended,
} from "../../typings/api.interface";
import { getImageUrl } from "../../utils/getImageUrl";

export default function MovieDetailsImage({
  movieFromProp,
  details,
}: {
  movieFromProp: MovieResultExtended;
  details: MovieResponseExtended;
}) {
  // For some reason, TMBD's discover endpoint and details endpoint
  // return different values for poster_path and backdrop_path
  // (i.e. discover would have the path but details wouldn't
  const { imageUrl, resizeMode } = getImageUrl(details, movieFromProp)!;

  return (
    <Image
      style={styles.image}
      source={
        imageUrl
          ? {
              uri: imageUrl,
            }
          : require("../../../assets/film-placeholder.png")
      }
      resizeMode={resizeMode}
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
