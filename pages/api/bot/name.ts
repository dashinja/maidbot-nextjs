import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'
import simpleCrypto from 'utilities/encrypt'

const prisma = new PrismaClient()
const { bots } = prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return null
  }

  const encryptName = simpleCrypto.encrypt(req.body.name)
  const result = await bots
    .findUnique({
      where: {
        name: encryptName,
      },
    })
    .catch((err: Error) => console.error(err))

  return result !== null ? res.json(false) : res.json(true)
}
