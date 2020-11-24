import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, FlatList } from "react-native";
import { useFavorites } from "../contexts/favorites.context";
import { deepCopy } from "../utils/deepCopy";
import { useNavigation } from "@react-navigation/native";
import { MovieResult } from "moviedb-promise/dist/request-types";
import FilterModal from "../components/FilterModal";
import MovieGrid from "../components/MovieGrid";
import LoadingIndicator from "../components/LoadingIndicator";
import FilterButton from "../components/FilterButton";
import { filterFavorites } from "../utils/filterFavorites";

export default function FavoritesScreen() {
  const { favorites, favoritesLoading } = useFavorites();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("vote_average.desc");
  const [filteredFavorites, setFilteredFavorites] = useState<MovieResult[]>(
    favorites
  );
  const flatlistRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  function onFilterChanged(newFilter: string) {
    setSelectedFilter(newFilter);
    flatlistRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  }

  useEffect(() => {
    const result = filterFavorites(favorites, selectedFilter)
    setFilteredFavorites(result);
  }, [favorites, selectedFilter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FilterButton onPress={() => setFilterModalVisible(true)} />
      ),
    });
  });

  if (favoritesLoading) {
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

      <MovieGrid movies={filteredFavorites} flatlistRef={flatlistRef} />
    </View>
  );
}
