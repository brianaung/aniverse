import { NextApiRequest, NextApiResponse } from 'next'
import { AnimeSearchResults } from '../../../../types'

const perPage = 14

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { query: string; page: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const response = await fetch(
    `https://api.consumet.org/meta/anilist/advanced-search?query=${query.query}&page=${query.page}&perPage=${perPage}&sort=["POPULARITY_DESC", "UPDATED_AT_DESC", "SCORE_DESC", "FAVOURITES", "UPDATED_AT", "START_DATE_DESC", "END_DATE_DESC"]`
  )

  // try catch can also be used if not using useSWR
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data: AnimeSearchResults = await response.json()
  return res.status(200).json(data)
}
