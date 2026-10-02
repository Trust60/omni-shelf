const AGE_RATING_MIN_AGE: Record<string, number> = {
  G: 0,
  PG: 6,
  'PG-13': 13,
  R: 17,
  'NC-17': 18,
  'TV-Y': 0,
  'TV-Y7': 7,
  'TV-G': 0,
  'TV-PG': 6,
  'TV-14': 14,
  'TV-MA': 17,
  E: 0,
  'E10+': 10,
  T: 13,
  M: 17,
  AO: 18,
  'R-17+': 17,
  'R+': 17,
  Rx: 18,
  '18+': 18
}

export function getAgeRatingLabel(ageRating: string | null | undefined) {
  const minAge = ageRating ? AGE_RATING_MIN_AGE[ageRating] : undefined

  return minAge === undefined ? null : `${minAge}+`
}
