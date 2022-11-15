import { NextApiRequest, NextApiResponse } from 'next'
import { getAnimeSearch } from '../../../../lib/anime'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // req.query (url param) can be string || string[]
  const query: { query: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const data = await getAnimeSearch(query.query)

  // return not found error if search results return empty array
  if (data && data.length === 0) {
    throw new Error('Not found')
  } else if (!data) {
    throw new Error('Error 500 Internal Server Error')
  }

  return res.status(200).json(data)
}
