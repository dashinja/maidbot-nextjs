import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'
import simpleCrypto from '../../../Utils/encrypt'

const prisma = new PrismaClient()
const { bots } = prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const result = await bots.findFirst({
      orderBy: {
        workDone: 'desc'
      },
      select: {
        name: true,
        botType: true,
        workDone: true
      }
    })
      .catch((err: Error) => console.error(err))

    console.log('result of score GET: ', result)
    if (result === null) {
      res.send('N/A')
      res.end()
    } else {
      res.json(result)
      res.end()
    }
  } else if (req.method === 'POST') {
    const newValue = { workDone: req.body.workDone + 5 }
    const result = await bots.update({
      data: newValue,
      where: {
        name: simpleCrypto.encrypt(req.body.botName),
      }
    })
      .catch(err => console.error(err))

    console.log('result of score POST', result)
    res.send(result)
    res.end()
  }
}