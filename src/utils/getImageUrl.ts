import {
  MovieResponseExtended,
  MovieResultExtended,
} from "../typings/api.interface";

interface GetImageUrlReturnType {
  imageUrl: string | null;
  resizeMode: "cover" | "contain";
}

export function getImageUrl(
  details: MovieResponseExtended,
  movieFromProp: MovieResultExtended
): GetImageUrlReturnType | null {
  const baseUrl = "https://image.tmdb.org/t/p/original";

  if (details?.backdrop_path) {
    return {
      imageUrl: baseUrl + details.backdrop_path,
      resizeMode: "cover",
    };
  } else if (movieFromProp.backdrop_path) {
    return {
      imageUrl: baseUrl + movieFromProp.backdrop_path,
      resizeMode: "cover",
    };
  } else if (details?.poster_path) {
    return {
      imageUrl: baseUrl + details.poster_path,
      resizeMode: "contain",
    };
  } else if (movieFromProp.poster_path) {
    return {
      imageUrl: baseUrl + movieFromProp.poster_path,
      resizeMode: "contain",
    };
  }

  return { imageUrl: null, resizeMode: "cover" };
}
