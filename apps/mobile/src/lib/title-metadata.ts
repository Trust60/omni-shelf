import { AIRING_STATUS_LABELS, ANIME_KIND_LABELS } from '@app/constants'

export interface MetadataLine {
  key: string
  label: string
  value: string
}

const num = (value: unknown) =>
  typeof value === 'number' && value > 0 ? value : null

const str = (value: unknown) =>
  typeof value === 'string' && value ? value : null

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (!h) return `${m}m`
  return m ? `${h}h ${m}m` : `${h}h`
}

export const PLATFORM_FAMILIES = [
  'pc',
  'playstation',
  'xbox',
  'nintendo',
  'ios',
  'android',
  'mac',
  'linux',
  'sega',
  'atari',
  'commodore'
] as const

export type PlatformFamily = (typeof PLATFORM_FAMILIES)[number]

const PLATFORM_PATTERNS: Record<PlatformFamily, RegExp> = {
  pc: /\bpc\b|windows/i,
  playstation: /playstation|\bps\d?\b|\bpsp\b|vita/i,
  xbox: /xbox/i,
  nintendo: /nintendo|switch|\bwii|\b\d?ds\b|game ?boy|gamecube|\bs?nes\b/i,
  ios: /\bios\b|iphone|ipad/i,
  android: /android/i,
  mac: /mac|apple/i,
  linux: /linux/i,
  sega: /sega|genesis|dreamcast|game gear|saturn|master system/i,
  atari: /atari|jaguar|lynx/i,
  commodore: /commodore|amiga/i
}

export interface Platforms {
  families: PlatformFamily[]
  other: string[]
}

export function getPlatforms(metadata: Record<string, unknown>): Platforms {
  const names = Array.isArray(metadata.platforms)
    ? metadata.platforms.filter(p => typeof p === 'string')
    : []

  const found = new Set<PlatformFamily>()
  const other: string[] = []

  for (const name of names) {
    const family = PLATFORM_FAMILIES.find(f => PLATFORM_PATTERNS[f].test(name))
    if (family) found.add(family)
    else other.push(name)
  }

  return {
    families: PLATFORM_FAMILIES.filter(f => found.has(f)),
    other
  }
}

export function getMetadataLines(
  metadata: Record<string, unknown>
): MetadataLine[] {
  const lines: MetadataLine[] = []

  const kind = str(metadata.kind)
  if (kind) {
    lines.push({
      key: 'kind',
      label: 'Format',
      value: ANIME_KIND_LABELS[kind] ?? capitalize(kind)
    })
  }

  const runtime = num(metadata.runtimeMinutes)
  if (runtime) {
    lines.push({
      key: 'runtime',
      label: 'Runtime',
      value: formatDuration(runtime)
    })
  }

  const seasons = num(metadata.seasons)
  if (seasons) {
    lines.push({ key: 'seasons', label: 'Seasons', value: String(seasons) })
  }

  const episodes = num(metadata.episodes)
  const episodeDuration = num(metadata.episodeDurationMinutes)
  if (episodes) {
    lines.push({
      key: 'episodes',
      label: 'Episodes',
      value: episodeDuration
        ? `${episodes} × ${formatDuration(episodeDuration)}`
        : String(episodes)
    })
  }

  const airingStatus = str(metadata.airingStatus)
  if (airingStatus) {
    lines.push({
      key: 'airingStatus',
      label: 'Status',
      value: AIRING_STATUS_LABELS[airingStatus] ?? capitalize(airingStatus)
    })
  }

  return lines
}
