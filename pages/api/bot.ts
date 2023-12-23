import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'
import simpleCrypto from 'utilities/encrypt'

type DateType = {
  returnDate: () => Date
}

const prisma = new PrismaClient()
const { bots } = prisma

const dateNow: DateType['returnDate'] = () => {
  return new Date() as unknown as Date
}

export type ChangeStateProp = { [key: string]: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!req.body.name || !req.body.botType) {
      console.log('req.body.name: ', req.body.name)
      console.log('req.body.botType: ', req.body.botType)

      res.send(console.error('Bot name already taken, please choose another!'))
      return
    } else {
      const dataObject = {
        name: simpleCrypto.encrypt(req.body.name),
        botType: req.body.botType,
        workDone: req.body.workDone,
        attack: req.body.attack,
        defense: req.body.defense,
        speed: req.body.speed,
        createdAt: dateNow(),
        updatedAt: dateNow(),
      }

      const result = await bots.create({
        data: dataObject,
      })
      res.send(result)
    }
  }

  if (req.method === 'GET') {
    console.log('Begin Get request for bots')
    const result = await bots.findMany()
    console.log('finished Get request for bots')
    res.send(result)
  }
}
