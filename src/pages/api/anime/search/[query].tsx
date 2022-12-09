import { NextApiRequest, NextApiResponse } from 'next'
import { getAnimeSearch } from '../../../../lib/anime'
import { AnimeSearchResults } from '../../../../types'

const perPage = 12

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { query: string; page: number } = Array.isArray(req.query) ? req.query[0] : req.query
  const response = await getAnimeSearch(query.query, query.page, perPage)

  if (response.error) {
    throw response.error
  }

  return res.status(200).json(response.data as AnimeSearchResults)
}
