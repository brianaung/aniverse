import { NextApiRequest, NextApiResponse } from 'next'
import { getAnimeSearch } from '../../../../lib/anime'

// todo: query string will be from req not hardcoded
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // req.query (url param) can be string || string[]
  const query: { query: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const queryResults = await getAnimeSearch(query.query)

  // return not found error if search results return empty array
  if (queryResults && queryResults.length === 0) {
    throw new Error('Not found')
  }

  return res.status(200).json(queryResults)
}
