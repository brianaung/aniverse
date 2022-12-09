import { NextApiRequest, NextApiResponse } from 'next'
import { TrendingAnimes } from '../../../types'

const perPage = 14

// todo: use function in anime.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { page: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const page = query.page
  const response = await fetch(`https://api.consumet.org/meta/anilist/trending?page=${page}&perPage=${perPage}`)

  // try catch can also be used if not using useSWR
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data: TrendingAnimes = await response.json()
  return res.status(200).json(data)
}
