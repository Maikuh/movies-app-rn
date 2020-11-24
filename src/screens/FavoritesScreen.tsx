import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, FlatList } from "react-native";
import { useFavorites } from "../contexts/favorites.context";
import { useNavigation } from "@react-navigation/native";
import FilterModal from "../components/Header/FilterModal";
import MoviesGrid from "../components/MoviesGrid/MoviesGrid";
import LoadingIndicator from "../components/LoadingIndicator";
import FilterButton from "../components/Header/FilterButton";
import { filterFavorites } from "../utils/filterFavorites";
import { MovieResultExtended } from "../typings/api.interface";

export default function FavoritesScreen() {
  const { favorites, favoritesLoading } = useFavorites();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("vote_average.desc");
  const [filteredFavorites, setFilteredFavorites] = useState<MovieResultExtended[]>(
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

      <MoviesGrid movies={filteredFavorites} flatlistRef={flatlistRef} />
    </View>
  );
}
