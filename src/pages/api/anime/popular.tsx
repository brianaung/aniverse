import { NextApiRequest, NextApiResponse } from 'next'
import { getPopularAnimes } from '../../../lib/anime'
import { PopularAnimes } from '../../../types'

const perPage = 12

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { page: number } = Array.isArray(req.query) ? req.query[0] : req.query
  const page = query.page
  const response = await getPopularAnimes(page, perPage)

  if (response.error) {
    throw response.error
  }

  return res.status(200).json(response.data as PopularAnimes)
}
