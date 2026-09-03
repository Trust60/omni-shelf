import type { TMediaType, TStatus } from "../../types/src";

export const STATUS_LABELS: Record<TStatus, string> = {
  want: "Want",
  progress: "In Progress",
  done: "Done",
};

export const TYPE_LABELS: Record<TMediaType, string> = {
  movie: "Movie",
  anime: "Anime",
  book: "Book",
  game: "Game",
  series: "Series",
};
