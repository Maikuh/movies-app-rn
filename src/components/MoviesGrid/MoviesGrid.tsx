import { MovieResult } from "moviedb-promise/dist/request-types";
import React, { RefObject } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import GridFooter from "./GridFooter";
import MovieCard from "../MovieCard/MovieCard";
import { MoviesGridProps } from "../../typings/MoviesGrid.interface";

export default function MoviesGrid({
  movies,
  flatlistRef,
  onEndReached,
  showGridFooter = false,
}: MoviesGridProps) {
  if (!movies.length) return <ActivityIndicator size={24} />;
  
  return (
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
      ListFooterComponent={showGridFooter ? GridFooter : null}
    />
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
