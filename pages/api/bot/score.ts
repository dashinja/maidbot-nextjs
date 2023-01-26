import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'
import { Prisma } from '@prisma/client'
import axios, { AxiosRequestConfig } from 'axios'
// import simpleCrypto from '../../../Utils/encrypt'
// import SimpleCrypto from 'simple-crypto-js'

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
        workDone: true,
        updatedAt: true
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
    const newValue = {workDone: req.body.workDone + 5} as Prisma.botsUpdateInput

const myRequest: AxiosRequestConfig = {
  headers: { Accept: 'application/json'},
  proxy: undefined,
  url: 'http://localhost:3000/api/bot/last',
  method: 'get',
}

    const savedBotData = await axios(myRequest)
    const botData = savedBotData.data
    const botName = botData[0].name

    const result = await bots.update({
      data: newValue,
      where: {
        name: botName,
      }
    })
      .catch(err => {
        console.error(err)
      })

    console.log('result of score POST', result)
    res.send(result)
    res.end()
  }
}