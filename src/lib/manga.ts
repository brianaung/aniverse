/* based on mangakakalot api */

import { MangaChapters, MangaInfo, MangaSearchRes } from "../types"

export async function getMangaSearch(query: string) {
  const res = await fetch(`https://api.consumet.org/manga/mangakakalot/${query}`)
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }
  const data: MangaSearchRes = await res.json()
  return {
    data,
    error: null,
  }
}

export async function getMangaInfo(mangaId: string) {
  const res = await fetch(`https://api.consumet.org/manga/mangakakalot/info?id=${mangaId}`)
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }
  const data: MangaInfo = await res.json()
  return {
    data,
    error: null,
  }
}

export async function getMangaChapters(chapterId: string) {
  const res = await fetch(`https://api.consumet.org/manga/mangakakalot/read?chapterId=${chapterId}`)
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }
  const data: MangaChapters = await res.json()
  return {
    data,
    error: null,
  }
}
