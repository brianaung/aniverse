import { NextApiRequest, NextApiResponse } from 'next'
import { getAnimeSearch } from '../../../../lib/anime'
import { IAnimeMinimalInfo } from '../../../../types'

/**
 * Fetch the anime data that user has searched
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // req.query (url param) can be string || string[]
  const query: { query: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const searchData: IAnimeMinimalInfo[] = await getAnimeSearch(query.query)

  // return not found error if search results return empty array
  if (searchData && searchData.length === 0) {
    throw new Error('Not found')
  } else if (!searchData) {
    throw new Error('Error 500 Internal Server Error')
  }

  return res.status(200).json(searchData)
}
