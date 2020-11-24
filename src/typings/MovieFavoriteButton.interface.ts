import { StyleProp, TextStyle } from "react-native";
import { MovieResponseExtended, MovieResultExtended } from "./api.interface";

export interface MovieFavoriteButtonProps {
  movie: MovieResponseExtended | MovieResultExtended;
  iconSize?: number
  iconStyles?: StyleProp<TextStyle>
  color?: string
}
