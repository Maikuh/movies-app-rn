import { MovieResultExtended } from "./api.interface";

export interface MovieCardProps {
  movie: MovieResultExtended;
}

export interface MovieCardTitleProps {
  title: string | undefined;
}
