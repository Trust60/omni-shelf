import type { CreatorRole } from '@app/api'

export const CREATOR_ROLE_LABELS: Record<
  CreatorRole,
  { one: string; many: string }
> = {
  DIRECTOR: { one: 'Director', many: 'Directors' },
  CREATOR: { one: 'Creator', many: 'Creators' },
  STUDIO: { one: 'Studio', many: 'Studios' },
  AUTHOR: { one: 'Author', many: 'Authors' }
}
