import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MovieDb } from "moviedb-promise";
import { MovieResponse, MovieResult } from "moviedb-promise/dist/request-types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFavorites } from "../contexts/favorites.context";
import { TMDB_API_KEY } from "@env"

const moviedb = new MovieDb(TMDB_API_KEY);

export default function MovieDetailsScreen() {
  const route = useRoute();
  const { movie }: { movie: MovieResult } = route.params as any;
  const [details, setDetails] = useState<MovieResponse>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useFavorites();

  async function fetchMovieDetails() {
    setLoading(true);
    const result = await moviedb.movieInfo(movie.id!);
    setDetails(result);
    console.log(result);
    navigation.setOptions({ title: result?.title });
    setLoading(false);
  }

  function getImageUrl() {
    const baseUrl = "https://image.tmdb.org/t/p/original";

    if (details?.backdrop_path) {
      return baseUrl + details.backdrop_path;
    } else if (movie.backdrop_path) {
      return baseUrl + movie.backdrop_path;
    } else if (details?.poster_path) {
      return baseUrl + details.poster_path;
    } else if (movie.poster_path) {
      return baseUrl + movie.poster_path;
    }

    return null;
  }

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!movie) {
    return <Text>Nothing to see here</Text>;
  }

  if (loading || !details) {
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        color="red"
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={
          getImageUrl()
            ? {
                uri: getImageUrl(),
              }
            : require("../../assets/film-placeholder.png")
        }
        resizeMode={
          movie.backdrop_path
            ? "cover"
            : movie.poster_path
            ? "contain"
            : "cover"
        }
      />
      <TouchableOpacity
        onPress={() => toggleFavorite(details)}
        style={{ marginLeft: "auto", marginRight: 4, marginTop: -42 }}
      >
        <FontAwesome
          name={
            favorites.find((f: any) => f.id === details.id)
              ? "heart"
              : "heart-o"
          }
          color="#eb349e"
          size={36}
          style={{ marginRight: 6 }}
        />
      </TouchableOpacity>

      <Text
        style={{
          color: "gray",
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 8,
          marginTop: 12,
        }}
      >
        Overview
      </Text>
      <Text style={styles.overview}>
        {details.overview?.length ? details.overview : "No overview provided"}
      </Text>

      <Text
        style={{
          color: "gray",
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 8,
          marginTop: 12,
        }}
      >
        Genres
      </Text>
      {details?.genres?.length ? (
        <FlatList
          horizontal
          data={details?.genres}
          contentContainerStyle={{
            marginHorizontal: 8,
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 12,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fafafa",
                borderRadius: 8,
                padding: 12,
                margin: 8,
                elevation: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#232323" }}>
                {item.name}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ margin: 8 }}>No Genres</Text>
      )}

      <Text
        style={{
          color: "gray",
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 8,
          marginTop: 12,
        }}
      >
        Info
      </Text>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginLeft: 8,
          marginVertical: 8,
        }}
      >
        <FontAwesome
          name="star"
          color="red"
          size={24}
          style={{ marginRight: 6 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {movie.vote_average}
        </Text>
        <Text style={{ fontSize: 20 }}>&nbsp;({movie.vote_count})</Text>
      </View>

      {details?.release_date ? (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            marginLeft: 8,
            marginVertical: 8,
          }}
        >
          <FontAwesome
            style={{ marginRight: 6 }}
            name="calendar"
            color="dodgerblue"
            size={24}
          />
          <Text style={{ fontSize: 20 }}>
            {new Date(details.release_date).toLocaleDateString()}
          </Text>
        </View>
      ) : null}

      {details.runtime && details.runtime > 0 ? (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            marginLeft: 8,
            marginVertical: 8,
          }}
        >
          <FontAwesome
            style={{ marginRight: 6 }}
            name="clock-o"
            color="green"
            size={24}
          />
          <Text style={{ fontSize: 20 }}>{details.runtime} minutes</Text>
        </View>
      ) : null}

      {details?.imdb_id ? (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            marginLeft: 8,
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          <FontAwesome
            style={{ marginRight: 6, position: "absolute" }}
            name="square"
            color="#232323"
            size={22}
          />
          <FontAwesome
            style={{ marginRight: 6 }}
            name="imdb"
            color="#f3ce13"
            size={24}
          />
          <Text
            style={{ fontSize: 20, color: "blue" }}
            onPress={() => {
              Linking.openURL(`https://www.imdb.com/title/${details.imdb_id}`);
            }}
          >
            View in IMDb
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overview: {
    padding: 8,
    fontSize: 18,
  },
  container: {},
  image: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: 256,
    width: "100%",
  },
});
