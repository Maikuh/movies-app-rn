import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MovieDb } from "moviedb-promise";
import { MovieResult } from "moviedb-promise/dist/request-types";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useFavorites } from "../contexts/favorites.context";
import { TMDB_API_KEY } from "@env"

const moviedb = new MovieDb(TMDB_API_KEY);

export default function DiscoverMoviesScreen() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { favorites, favoritesLoading, toggleFavorite } = useFavorites();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("vote_average.desc");
  const flatlistRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  async function fetchMoreMovies(page: number) {
    const { results } = await moviedb.discoverMovie({
      page,
      sort_by: selectedFilter as any,
    });

    if (results?.length) {
      const newArray = [...movies, ...results];
      const uniqueIds = Array.from(new Set(newArray.map((m) => m.id)));
      const mapped = uniqueIds.map((id) => {
        return newArray.find((m) => m.id! === id)!;
      });
      setMovies(mapped);
    }
  }

  async function getMoviesWithFilter(sortBy: string) {
    setLoading(true);
    const { results } = await moviedb.discoverMovie({
      page,
      sort_by: sortBy as any,
    });

    if (results?.length) {
      setMovies(results);
      setLoading(false);
      flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }

  useEffect(() => {
    fetchMoreMovies(page);
  }, [page]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={{ alignItems: "center", padding: 8 }}
        >
          <FontAwesome name="filter" size={20} />
        </TouchableOpacity>
      ),
    });
  });

  if (loading || favoritesLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        color="red"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(false);
        }}
        statusBarTranslucent
        transparent
      >
        <Pressable
          onPressOut={() => setFilterModalVisible(false)}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "rgba(35,35,35,0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "#fafafa", padding: 12, width: "90%" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sort By</Text>
            <Picker
              selectedValue={selectedFilter}
              onValueChange={(value) => {
                const newFilter = value.toString();
                getMoviesWithFilter(newFilter);
                setSelectedFilter(newFilter);
                setFilterModalVisible(false);
              }}
            >
              <Picker.Item value="original_title.asc" label="Title" />
              <Picker.Item value="release_date.desc" label="Release Date" />
              <Picker.Item value="vote_average.desc" label="Ratings" />
            </Picker>
          </View>
        </Pressable>
      </Modal>

      {movies.length ? (
        <FlatList
          ref={flatlistRef}
          data={movies}
          contentContainerStyle={styles.gridContainer}
          onEndReached={() => {
            setPage(page + 1);
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetails", { movie: item })
              }
              style={styles.touchable}
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
                  source={item.poster_path ? {
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  } : require('../../assets/film-placeholder.png')}
                />

                <Text
                  style={{
                    fontWeight: "bold",
                    flexWrap: "wrap",
                    maxWidth: 128,
                    textAlign: "center",
                    marginVertical: 4,
                  }}
                  numberOfLines={3}
                >
                  {item.title}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: "auto",
                    marginHorizontal: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome
                      name="star"
                      color="red"
                      size={18}
                      style={{ marginRight: 6 }}
                    />
                    <Text>{item.vote_average}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      toggleFavorite(item);
                      console.log(favorites.length);
                    }}
                  >
                    <FontAwesome
                      name={
                        favorites.find((f: any) => f.id === item.id)
                          ? "heart"
                          : "heart-o"
                      }
                      color="#eb349e"
                      size={24}
                      style={{ marginRight: 6 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          centerContent={true}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          ListFooterComponent={ListFooter}
        />
      ) : (
        <ActivityIndicator size={24} />
      )}
    </View>
  );
}

function ListFooter() {
  return (
    <View
      style={{
        paddingVertical: 20,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <ActivityIndicator animating size="large" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
  },
  gridContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 8,
    // flexGrow: 1,
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
