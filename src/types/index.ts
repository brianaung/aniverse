export type AnimeResult = {
  id: string
  // malId: number
  title: TitleLang
  status: string
  image: string
  trailer: AnimeTrailer
  cover: string
  popularity: number
  description: string
  rating: number
  genres: [string]
  color?: string
  totalEpisodes: number
  releaseDate: number
  duration: number
  type: string
}

export type AnimeInfo = AnimeResult & {
  synonyms: string
  isLicensed: boolean
  isAdult: boolean
  countryOfOrigin: string
  color: string
  startDate: Date
  endDate: Date
  nextAiringEpisode: Date
  season: string
  studios: [string]
  subOrDub: 'sub' | 'dub'
  // recommendations:
  characters: [Character]
  // relations:
  episodes: AnimeEpisode[]
}

export type AnimeSearchResults = {
  currentPage: number
  hasNextPage: boolean
  results: AnimeResult[]
}

export type TrendingAnimes = AnimeSearchResults

export type PopularAnimes = AnimeSearchResults

export type VideoSrc = {
  url: string
  isM3U8: boolean
  quality: string
}

export type AnimeEpisode = {
  id: string
  title: string
  description: string
  number: number
  image: string
}

type AnimeTrailer = {
  id: string
  site: string
  thumbnail: string
}

type TitleLang = {
  romaji: string
  english: string
  native: string
  userPreferred: string
}

type Character = {
  id: number
  role: string
  name: CharacterName
  image: string
  // voiceActors
}

type CharacterName = {
  first: string
  last: string
  full: string
  native: string
  userPreferred: string
}

type Date = {
  year: number
  month: number
  day: number
}
