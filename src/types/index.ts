export interface IEpisode {
  id: string
  number: number
  url: string
}

export interface IAnimeInfo {
  id: string
  title: string
  url: string
  image: string
  releaseDate: string
  description: string
  genres: [string]
  subOrDub: string
  type: string
  status: string
  otherName: string
  totalEpisodes: number
  episodes: [IEpisode]
}

export interface IAnimeMinimalInfo {
  id: string
  title: string
  url: string
  image: string
  releaseDate: string
  subOrDub: string
}
