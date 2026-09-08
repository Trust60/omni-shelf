export const MEDIA_TYPES = ['movie', 'series', 'anime', 'game', 'book'] as const
export type TMediaType = (typeof MEDIA_TYPES)[number]

export const STATUSES = ['want', 'progress', 'done'] as const
export type TStatus = (typeof STATUSES)[number]

export interface ITitle {
  id: string
  type: TMediaType
  status: TStatus
  name: string
  year: number | null
  cover: string | null
}

export * from './ui'
