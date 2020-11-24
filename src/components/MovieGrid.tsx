import { MovieResult } from "moviedb-promise/dist/request-types";
import React, { RefObject } from "react";
import { Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ListFooter from "./ListFooter";
import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  flatlistRef,
  onEndReached,
  showListFooter = false
}: {
  movies: MovieResult[];
  flatlistRef: RefObject<FlatList<any>>;
  onEndReached?: any;
  showListFooter?: boolean
}) {
  return (
    <>
      {movies.length ? (
        <FlatList
          ref={flatlistRef}
          data={movies}
          contentContainerStyle={styles.gridContainer}
          onEndReached={() => {
            if (onEndReached) {
              onEndReached();
            }
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <MovieCard movie={item} />}
          numColumns={2}
          centerContent={true}
          keyExtractor={(item, index) => (item.id ?? index).toString()}
          ListFooterComponent={showListFooter ? ListFooter : null}
        />
      ) : (
        <ActivityIndicator size={24} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 8,
    paddingBottom: 12,
  },
});
