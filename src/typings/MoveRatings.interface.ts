import { StyleProp, ViewStyle } from "react-native";

export interface MovieRatingsProps {
  voteAverage: number | undefined;
  voteCount: number | undefined;
  containerStyles?: StyleProp<ViewStyle>
  iconSize?: number
  fontSize?: number
  color?: string
}
