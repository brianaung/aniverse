import { NextApiResponse, NextApiRequest } from "next";
import { getMangaSearch } from "../../../../lib/manga";

export default async function handler(res: NextApiResponse, req: NextApiRequest) {
  const query: string = Array.isArray(req.query) ? req.query[0] : req.query
  const response = await getMangaSearch(query)
}
