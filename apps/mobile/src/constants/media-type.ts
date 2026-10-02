import type { TitleListItemResponseType } from '@app/api/src/generated/models'
import {
  BookOpen,
  Film,
  Gamepad2,
  type LucideIcon,
  Sparkles,
  Tv
} from 'lucide-react-native'

export const MEDIA_TYPE_ICONS: Record<TitleListItemResponseType, LucideIcon> = {
  MOVIE: Film,
  TV_SHOW: Tv,
  ANIME: Sparkles,
  GAME: Gamepad2,
  BOOK: BookOpen
}
