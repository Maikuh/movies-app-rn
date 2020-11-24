import { MovieResultExtended } from "../typings/api.interface";
import { deepCopy } from "./deepCopy";

export function filterFavorites(
  favorites: MovieResultExtended[],
  selectedFilter: string
) {
  const favoritesCopy: MovieResultExtended[] = deepCopy(favorites);

  switch (selectedFilter) {
    case "vote_average.desc": {
      return favoritesCopy.sort(
        (a, b) => b.vote_average! - a.vote_average!
      );
    }
    case "original_title.asc": {
      return favoritesCopy.sort((a, b) => {
        if (a.title! > b.title!) return 1;
        else if (a.title! < b.title!) return -1;
        return 0;
      });
    }
    case "release_date.desc": {
      return favoritesCopy.sort((a, b) => {
        const dateA = Date.parse(a.release_date!);
        const dateB = Date.parse(b.release_date!);

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
