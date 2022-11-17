export interface IEpisode {
  id: string
  number: number
  url: string
}

export interface IAnimeExtendedInfo extends IAnimeMinimalInfo {
  description: string
  genres: [string]
  type: string
  status: string
  totalEpisodes: number
  episodes: [IEpisode]
  otherName?: string
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

export interface IAnimeTopInfo extends IAnimeBaseInfo {
  genres: [string]
}

export interface IAnimeRecentInfo extends IAnimeBaseInfo {
  episodeId: string
  episodeNumber: number
}

export interface IAnimeTopResults {
  currentPage: number
  hasNextPage: boolean
  results: [IAnimeTopInfo]
}

export interface IAnimeRecentResults {
  currentPage: number
  hasNextPage: boolean
  results: [IAnimeRecentInfo]
}

export interface IVideoSrc {
  url: string
  quality: string
  isM3U8: boolean
}