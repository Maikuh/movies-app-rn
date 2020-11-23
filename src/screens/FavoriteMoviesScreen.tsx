import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFavorites } from "../contexts/favorites.context";
import { Picker } from "@react-native-picker/picker";
import { deepCopy } from "../utils/deepCopy";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function FavoriteMoviesScreen() {
  const { favorites, favoritesLoading, toggleFavorite } = useFavorites();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("vote_average.desc");
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  const flatlistRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  function filterFavorites() {
    const favoritesCopy = deepCopy(favorites);

    switch (selectedFilter) {
      case "vote_average.desc": {
        setFilteredFavorites(
          favoritesCopy.sort(
            (a: any, b: any) => b.vote_average - a.vote_average
          )
        );
        break;
      }
      case "original_title.asc": {
        setFilteredFavorites(
          favoritesCopy.sort((a: any, b: any) => {
            console.log(a.title, b.title);
            if (a.title > b.title) return 1;
            else if (a.title < b.title) return -1;
            return 0;
          })
        );
        break;
      }
      case "release_date.desc": {
        setFilteredFavorites(
          favoritesCopy.sort((a: any, b: any) => {
            const dateA = Date.parse(a.release_date);
            const dateB = Date.parse(b.release_date);

            if (isNaN(dateA) || isNaN(dateB)) {
              return 1;
            } else if (dateA > dateB) {
              return -1;
            } else if (dateA < dateB) {
              return 1;
            }

            return 0;
          })
        );
        break;
      }

      default: {
        console.log("el pepe");
        break;
      }
    }
  }

  useEffect(() => {
    filterFavorites();
  }, [selectedFilter, favorites]);

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

  if (favoritesLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        color="red"
      />
    );
  }

  return (
    <View>
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
                setSelectedFilter(newFilter);
                setFilterModalVisible(false);
                flatlistRef.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                });
              }}
            >
              <Picker.Item value="original_title.asc" label="Title" />
              <Picker.Item value="release_date.desc" label="Release Date" />
              <Picker.Item value="vote_average.desc" label="Ratings" />
            </Picker>
          </View>
        </Pressable>
      </Modal>

      {filteredFavorites.length ? (
        <FlatList
          data={filteredFavorites}
          ref={flatlistRef}
          contentContainerStyle={styles.gridContainer}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MovieDetails", { movie: item })}
              style={{ ...styles.touchable, opacity: item.placeholder && 0 }}
              disabled={item.placeholder}
              activeOpacity={0.8}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://freecinema.info/assets/img/film-placeholder.png",
                  }}
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

                  <TouchableOpacity onPress={() => toggleFavorite(item)}>
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
        />
      ) : (
        <ActivityIndicator size={24} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 8,
    paddingBottom: 12,
    // flexGrow: 1,
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
  image: {
    aspectRatio: 2 / 3,
    justifyContent: "center",
    alignItems: "center",
    height: 256,
    borderRadius: 8,
  },
});
