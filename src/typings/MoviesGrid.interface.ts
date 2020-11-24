import { RefObject } from "react";
import { FlatList } from "react-native";
import { MovieResultExtended } from "./api.interface";

export interface MoviesGridProps {
  movies: MovieResultExtended[];
  flatlistRef: RefObject<FlatList<any>>;
  showGridFooter?: boolean;
  onEndReached?: () => void;
}
