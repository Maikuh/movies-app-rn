import { MovieResult } from "moviedb-promise/dist/request-types";
import { deepCopy } from "./deepCopy";

export function filterFavorites(
  favorites: MovieResult[],
  selectedFilter: string
) {
  const favoritesCopy = deepCopy(favorites);

  switch (selectedFilter) {
    case "vote_average.desc": {
      return favoritesCopy.sort(
        (a: any, b: any) => b.vote_average - a.vote_average
      );
    }
    case "original_title.asc": {
      return favoritesCopy.sort((a: any, b: any) => {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        return 0;
      });
    }
    case "release_date.desc": {
      return favoritesCopy.sort((a: any, b: any) => {
        const dateA = Date.parse(a.release_date);
        const dateB = Date.parse(b.release_date);

        if (isNaN(dateA) || isNaN(dateB)) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        }

        return 0;
      });
    }

    default: {
      console.log("el pepe");
      break;
    }
  }
}
