import { Genre } from "moviedb-promise/dist/types";
import { MovieResponseExtended } from "./api.interface";

export interface MovieDetailsGenreListProps {
  genres: Genre[];
}

export interface MovieDetailsHeaderProps {
  title: string;
}

export interface MovieDetailsIMDBProps {
  imdbId: string;
  iconSize?: number;
  fontSize?: number;
}

export interface MovieDetailsRatingProps {
  details: MovieResponseExtended;
}

export interface MovieDetailsReleaseDateProps {
  releaseDate?: string;
}

export interface MovieDetailsRuntimeProps {
  runtime: number
}
