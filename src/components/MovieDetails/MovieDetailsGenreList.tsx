import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MovieDetailsGenreListProps } from "../../typings/MovieDetails.interface";

export default function MovieDetailsGenreList({
  genres
}: MovieDetailsGenreListProps) {
  if (!genres || !genres.length) {
    return <Text style={{ margin: 8 }}>No Genres</Text>;
  }

  return (
    <FlatList
      horizontal
      data={genres}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item, index) => `genre-${index}`}
      renderItem={({ item }) => (
        <View style={styles.genreCard}>
          <Text style={styles.genreText}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 12,
  },
  genreCard: {
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 12,
    margin: 8,
    elevation: 4,
  },
  genreText: { fontWeight: "bold", color: "#232323" },
});
