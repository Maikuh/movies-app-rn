import { useNavigation, useRoute } from "@react-navigation/native";
import { MovieResponse, MovieResult } from "moviedb-promise/dist/request-types";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import MovieDetailsImage from "../components/MovieDetails/MovieDetailsImage";
import MovieDetailsFavoriteButton from "../components/MovieDetails/MovieDetailsFavoriteButton";
import MovieDetailsHeader from "../components/MovieDetails/MovieDetailsHeader";
import MovieDetailsGenreList from "../components/MovieDetails/MovieDetailsGenreList";
import MovieDetailsRating from "../components/MovieDetails/MovieDetailsRating";
import MovieDetailsReleaseDate from "../components/MovieDetails/MovieDetailsReleaseDate";
import MovieDetailsRuntime from "../components/MovieDetails/MovieDetailsRuntime";
import MovieDetailsIMDB from "../components/MovieDetails/MovieDetailsIMDB";
import LoadingIndicator from "../components/LoadingIndicator";
import moviesApi from "../api/movies.api";

export default function MovieDetailsScreen() {
  const route = useRoute();
  const { movie }: { movie: MovieResult } = route.params as any;
  const [details, setDetails] = useState<MovieResponse>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  async function fetchMovieDetails() {
    setLoading(true);
    const { result } = await moviesApi.getMovieDetails(movie.id!);
    setDetails(result);
    navigation.setOptions({ title: result?.title });
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!movie) {
    return <Text>Nothing to see here</Text>;
  }

  if (loading || !details) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView>
      <MovieDetailsImage movieFromProp={movie} details={details} />
      <MovieDetailsFavoriteButton details={details} />

      <MovieDetailsHeader title="Overview" />
      <Text style={styles.overviewParagraph}>
        {details.overview?.length ? details.overview : "No overview provided"}
      </Text>

      <MovieDetailsHeader title="Genres" />
      <MovieDetailsGenreList genres={details.genres!} />

      <MovieDetailsHeader title="Info" />
      <MovieDetailsRating details={details} />
      <MovieDetailsReleaseDate details={details} />
      <MovieDetailsRuntime runtime={details.runtime!} />
      <MovieDetailsIMDB imdbId={details.imdb_id!} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overviewParagraph: {
    padding: 8,
    fontSize: 18,
  },
});
