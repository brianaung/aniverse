import { NextApiRequest, NextApiResponse } from 'next'
import { getAnimeSearch } from '../../../../lib/anime'

// todo: query string will be from req not hardcoded
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // req.query (url param) can be string || string[]
    const query: { query: string } = Array.isArray(req.query) ? req.query[0] : req.query
    const queryResults = await getAnimeSearch(query.query)
    return res.status(200).json(queryResults)
  } catch (err) {
    return res.status(500).json({ error: 'failed to load data' })
  }
}
