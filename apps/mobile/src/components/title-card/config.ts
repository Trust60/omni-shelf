import type { TitleListItemResponseType } from '@app/api/src/generated/models'
import {
  BookOpen,
  Film,
  Gamepad2,
  type LucideIcon,
  Sparkles,
  Tv
} from 'lucide-react-native'

import { radius } from '@app/tokens'

interface ICardConfig {
  radius: number
  icon: LucideIcon
  stacked?: boolean
  spine?: boolean
  glow?: string
}

export const CARD_CONFIG: Record<TitleListItemResponseType, ICardConfig> = {
  MOVIE: {
    radius: radius.md,
    icon: Film
  },
  TV_SHOW: {
    radius: radius.md,
    icon: Tv,
    stacked: true
  },
  ANIME: {
    radius: radius.md,
    icon: Sparkles,
    glow: 'rgba(129, 65, 248, 0.75)'
  },
  GAME: {
    radius: radius.lg,
    icon: Gamepad2
  },
  BOOK: {
    radius: radius.sm,
    icon: BookOpen,
    spine: true
  }
}
