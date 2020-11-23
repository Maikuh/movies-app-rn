import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieResult } from "moviedb-promise/dist/request-types";
import React, { useEffect, useState } from "react";
import { ActionMap } from "./ActionMap";

type FavoritesPayload = {
  "set-favorites": {
    favorites: MovieResult[];
  };
};

type FavoritesAction = ActionMap<FavoritesPayload>[keyof ActionMap<FavoritesPayload>];

const FavoritesContext = React.createContext<any>(undefined);

function favoritesReducer(
  state: MovieResult[],
  action: FavoritesAction
): MovieResult[] {
  switch (action.type) {
    case "set-favorites": {
      return action.payload.favorites;
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  let [state, dispatch] = React.useReducer(favoritesReducer, []);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  function padFavorites(favorites: any[]) {
      const filteredFavorites = favorites.filter(f => !f.placeholder)
      if (filteredFavorites.length % 2 !== 0) {
          return [...filteredFavorites, { placeholder: true }]
      }

      return filteredFavorites
  }

  async function loadFavorites() {
    setFavoritesLoading(true);
    const favoritesFromStorage = await AsyncStorage.getItem("favorites");

    if (favoritesFromStorage) {
      dispatch({
        type: "set-favorites",
        payload: { favorites: padFavorites(JSON.parse(favoritesFromStorage)) },
      });
    }
    setFavoritesLoading(false);
  }

  async function toggleFavorite(movie: MovieResult) {
    let newFavorites;

    if (state.find((f) => f.id === movie.id)) {
      newFavorites = state.filter((f) => f.id !== movie.id);
    } else {
      newFavorites = [...state, movie];
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));

    dispatch({ type: "set-favorites", payload: { favorites: padFavorites(newFavorites) } });
  }

  useEffect(() => {
      loadFavorites()
  }, [])

  const value = {
    favorites: state,
    favoritesLoading,
    loadFavorites,
    toggleFavorite,
  };

  return (
    <>
      <FavoritesContext.Provider value={value}>
        {children}
      </FavoritesContext.Provider>
    </>
  );
}

function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export { FavoritesProvider, useFavorites };
