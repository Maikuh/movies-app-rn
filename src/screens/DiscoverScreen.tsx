import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { MovieResult } from "moviedb-promise/dist/request-types";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../contexts/favorites.context";
import FilterModal from "../components/Header/FilterModal";
import FilterButton from "../components/Header/FilterButton";
import LoadingIndicator from "../components/LoadingIndicator";
import MoviesGrid from "../components/MoviesGrid/MoviesGrid";
import moviesApi from "../api/movies.api";

export default function DiscoverScreen() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { favoritesLoading } = useFavorites();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("vote_average.desc");
  const flatlistRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  async function fetchMoreMovies(page: number) {
    const { results, total_pages } = await moviesApi.fetchMoreMovies(page, selectedFilter)

    if (results?.length) {
      const newArray = [...movies, ...results];
      const uniqueIds = Array.from(new Set(newArray.map((m) => m.id)));
      const mapped = uniqueIds.map((id) => {
        return newArray.find((m) => m.id! === id)!;
      });
      setMovies(mapped);
    }

    if (total_pages) setTotalPages(total_pages);
  }

  async function getMoviesWithFilter(sortBy: string) {
    setLoading(true);
    const { results } = await moviesApi.getMoviesWithFilter(sortBy)

    if (results?.length) {
      setMovies(results);
      setLoading(false);
      flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }

  function onFilterChanged(newFilter: string) {
    getMoviesWithFilter(newFilter);
    setSelectedFilter(newFilter);
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    fetchMoreMovies(page);
  }, [page]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FilterButton onPress={() => setFilterModalVisible(true)} />
      ),
    });
  });

  if (loading || favoritesLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View>
      <FilterModal
        selectedFilter={selectedFilter}
        onValueChange={onFilterChanged}
        filterModalVisible={filterModalVisible}
        closeModal={() => setFilterModalVisible(false)}
      />

      <MoviesGrid
        movies={movies}
        onEndReached={nextPage}
        flatlistRef={flatlistRef}
        showGridFooter
      />
    </View>
  );
}

const styles = StyleSheet.create({ });
