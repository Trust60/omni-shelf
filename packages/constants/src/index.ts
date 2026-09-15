import type {
  LibraryEntryResponseStatus,
  TitleListItemResponseType
} from '../../api/src/generated/models'

export const STATUS_LABELS: Record<LibraryEntryResponseStatus, string> = {
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ON_HOLD: 'On Hold',
  DROPPED: 'Dropped'
}

export const TYPE_LABELS: Record<TitleListItemResponseType, string> = {
  MOVIE: 'Movie',
  ANIME: 'Anime',
  BOOK: 'Book',
  GAME: 'Game',
  TV_SHOW: 'Series'
}
