import type { TitleListItemResponseType } from '@app/api/src/generated/models'

import { radius } from '@app/tokens'

interface ICardConfig {
  radius: number
  stacked?: boolean
  spine?: boolean
  glow?: string
}

export const CARD_CONFIG: Record<TitleListItemResponseType, ICardConfig> = {
  MOVIE: {
    radius: radius.md
  },
  TV_SHOW: {
    radius: radius.md,
    stacked: true
  },
  ANIME: {
    radius: radius.md,
    glow: 'rgba(129, 65, 248, 0.75)'
  },
  GAME: {
    radius: radius.lg
  },
  BOOK: {
    radius: radius.sm,
    spine: true
  }
}
