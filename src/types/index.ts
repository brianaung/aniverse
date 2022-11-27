/* export interface IEpisode {
  id: string
  number: number
  url: string
}

export interface IAnimeExtendedInfo extends IAnimeMinimalInfo {
  description: string
  genres: string[]
  type: string
  status: string
  totalEpisodes: number
  episodes: IEpisode[]
  otherName: string
  cover: string
}

export interface IAnimeMinimalInfo extends IAnimeBaseInfo {
  releaseDate: string
  subOrDub: string
}

export interface IAnimeBaseInfo {
  id: string
  title: string
  image: string
  url: string
}

export interface IAnimeRecentInfo extends IAnimeBaseInfo {
  episodeId: string
  episodeNumber: number
}

export interface IAnimeRecentResults {
  currentPage: number
  hasNextPage: boolean
  results: IAnimeRecentInfo[]
}


/***************** for anilist api ********************/
export type AnimeInfo = AnimeResults & {
  synonyms: string
  isLicensed: boolean
  isAdult: boolean
  countryOfOrigin: string
  popularity: number
  color: string
  status: string
  startDate: Date
  endDate: Date
  nextAiringEpisode: Date
  season: string
  studios: [string]
  subOrDub: "sub" | "dub"
  // recommendations:
  characters: [Character]
  // relations:
  episodes: [AnimeEpisode]
}

export type PopularAnimes = {
  currentPage: number
  hasNextPage: boolean
  results: AnimeResults[]
}

export type TrendingAnimes = PopularAnimes

export type AnimeResults = {
  id: string
  // malId: number
  title: AnimeTitle
  image: string
  // trailer: 
  description: string
  cover: string
  rating: number
  releaseDate: number
  totalEpisodes: number
  genres: [string]
  duration: number
  type: string
}

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

type AnimeTitle = {
  romaji: string
  english: string
  native: string
  userPreferred: string
}

type Character = {
  id: number
  role: string
  name: Name
}

type Name = {
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
