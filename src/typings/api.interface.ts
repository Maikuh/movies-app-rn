import { MovieResponse, MovieResult } from "moviedb-promise/dist/request-types";

interface MovieWithPlaceholder {
  placeholder: boolean;
}

export interface MovieResultExtended
  extends MovieResult,
    MovieWithPlaceholder {}

export interface MovieResponseExtended
  extends MovieResponse,
    MovieWithPlaceholder {}
