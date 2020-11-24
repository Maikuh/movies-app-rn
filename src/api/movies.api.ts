import { MovieDb } from "moviedb-promise";
import { TMDB_API_KEY } from "@env";

const moviedb = new MovieDb(TMDB_API_KEY);

async function fetchMoreMovies(page: number, selectedFilter: any) {
  const { results, total_pages } = await moviedb.discoverMovie({
    page,
    sort_by: selectedFilter,
  });

  return {
    results,
    total_pages,
  };
}

async function getMoviesWithFilter(sortBy: string) {
  const { results } = await moviedb.discoverMovie({
    page: 1,
    sort_by: sortBy as any,
  });

  return { results };
}

async function getMovieDetails(id: string | number) {
  const result = await moviedb.movieInfo(id);
  return { result }
}

export default {
  fetchMoreMovies,
  getMoviesWithFilter,
  getMovieDetails,
};
