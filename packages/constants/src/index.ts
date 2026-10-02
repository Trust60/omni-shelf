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

export const TYPE_ACTION_LABELS: Record<TitleListItemResponseType, string> = {
  MOVIE: 'Watch movie',
  TV_SHOW: 'Watch show',
  ANIME: 'Watch anime',
  GAME: 'Play game',
  BOOK: 'Read book'
}

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refreshToken'

export * from './age-rating'
export * from './auth-form'
export * from './creator-role'
export * from './title-metadata'
