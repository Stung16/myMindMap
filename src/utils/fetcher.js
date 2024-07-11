import { client } from "./clientUtils"

export const fetcher = async (url) => {
  const res = await client.get(url)
  return res.data
}
