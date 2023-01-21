import axios, { AxiosResponse } from 'axios'
import { createValidation, executioner, ExecutionerProps, ExecutionerStateProps, speakerHandler } from './helpers'
import {taskLists} from './patterns'

type DestroyerChoreMethodType = {
  description: string
  eta: number,
  name?: string
}

type DestroyerAttackMethodType = {
  description: string,
  attack: 10000,
  eta: 3000,
  name: 'Attack',
}

type DestroyerDefenseMethodType = {
  defense: number
  eta: 3500,
  description: string,
  name: 'Defense'
}

type DestroyerStatMethodType = {
  description: string,
  health: string,
  eta: 1000
}

export type DestroyerType = {
  name: string
  botType: string
  health: number
  attack: number
  defense: number
  speed: number
  bakeSomeCookies: (name: string, type: string) => DestroyerChoreMethodType
  doTheDishes: (name: string, type: string) => DestroyerChoreMethodType
  doTheLaundry: (name: string, type: string) => DestroyerChoreMethodType
  makeASammich: (name: string, type: string) => DestroyerChoreMethodType
  sweepTheHouse: (name: string, type: string) => DestroyerChoreMethodType
  giveTheDogABath: (name: string, type: string) => DestroyerChoreMethodType
  mowTheLawn: (name: string, type: string) => DestroyerChoreMethodType
  rakeTheLeaves: (name: string, type: string) => DestroyerChoreMethodType
  takeOutTheRecycling: (name: string, type: string) => DestroyerChoreMethodType
  washTheCar: (name: string, type: string) => DestroyerChoreMethodType
  attackValue: (name: string) => DestroyerAttackMethodType
  defenseValue: (name: string) => DestroyerDefenseMethodType
  healthValue: () => DestroyerType['health']
  speedValue: (name: string) => { speed: DestroyerType['speed'], eta: 2000 }
  stats: (name: string) => DestroyerStatMethodType
}
export default class Destroyer {
  name: string
  type: string
  health: number
  attack: number
  defense: number
  speed: number
  constructor(name: string, type: string) {
    this.name = name
    this.type = type
    this.health = 50000
    this.attack = 9000
    this.defense = this.attack / 2
    this.speed = this.defense / 50
  }

//   /////////////////////////////////
//   // Inside Chore Methods: Short //
//   /////////////////////////////////
  bakeSomeCookies() {
    return {
      description: `${this.name} the ${this.type} is baking cookies.`,
      eta: 8000,
      name: 'Bake Cookies',
    }
  }
  doTheDishes() {
    return {
      description: `${this.name} the ${this.type} is doing the dishes.`,
      eta: 5000,
      name: 'Dishes',
    }
  }
  doTheLaundry() {
    return {
      description: `${this.name} the ${this.type} is taking out the laundry.`,
      eta: 10000,
      name: 'Laundry',
    }
  }
  makeASammich() {
    return {
      description: `${this.name} the ${this.type} is making a yummy sammich!`,
      eta: 7000,
      name: 'Make Sandwhich',
    }
  }
  sweepTheHouse() {
    return {
      description: `${this.name} the ${this.type} is sweeping the house`,
      eta: 3000,
    }
  }

//   /////////////////////////////////
//   // Outside Chore Methods: Long //
//   /////////////////////////////////
  giveTheDogABath() {
    return {
      description: `${this.name} the ${this.type} is giving the dog a bath.`,
      eta: 14500,
      name: 'Bathe Dog',
    }
  }
  mowTheLawn() {
    return {
      description: `${this.name} the ${this.type} is mowing the lawn.`,
      eta: 20000,
    }
  }
  rakeTheLeaves() {
    return {
      description: `${this.name} the ${this.type} is raking the leaves!`,
      eta: 18000,
    }
  }
  takeOutTheRecycling() {
    return {
      description: `${this.name} the ${this.type} is taking out the recycling `,
      eta: 4000,
    }
  }
  washTheCar() {
    return {
      description: `${this.name} the ${this.type} is washing the car!`,
      eta: 20000,
    }
  }

//   ///////////////////////////////
//   // Drill and Defense Methods //
//   ///////////////////////////////
  attackValue() {
    return {
      description: `${this.name} is attacking!`,
      attack: 10000,
      eta: 3000,
      name: 'Attack',
    }
  }
  defenseValue() {
    let defense = this.attackValue().attack / 2
    return {
      defense,
      eta: 3500,
      description: `${this.name
        } is defending like Optimus.Flexin' like a Prime!`,
      name: 'Defense',
    }
  }
  healthValue() {
    let health = this.health
    this.health = health
    return health
  }
  speedValue() {
    let speed = this.defenseValue().defense / 50
    return {
      speed,
      eta: 2000,
    }
  }
  stats() {
    return {
      description: `Health: ${this.healthValue()} Attack: ${this.attackValue().attack
        } Defense: ${this.defenseValue().defense} Speed: ${this.speedValue().speed
        }`,
      health:
        this.health >= 0
          ? `${this.name}'s health is ${this.health}.`
          : `${this.name} is defeated!`,
      eta: 1000,
    }
  }
}

export type ScoreObject = {
  botType: string
  workDone: number
  name: string
}

export type Score = Function | string | ScoreObject

export const getScores = async (setScore: React.Dispatch<React.SetStateAction<Score>>) => {
  try {
    const allScores = await axios.get('/api/bot/score')
    console.log('GET: api/bot/score: ', await allScores.data)
    setScore(allScores.data)
  } catch (error) {
    console.error(error)
  }
}

export type BotInfo = {
  botName: string,
  botType: string,
  semiPermaName: string
}

export const botNameIsValid = async (bot: BotInfo) => {
  let validationReturn: boolean | AxiosResponse<any, any>

  if (bot.botName === '') {
    return true
  } else {
    const { botName } = bot
    const data = {
      name: botName
    }

    try {
      console.log("POST: api/bot/name")
      const result = await axios.post('api/bot/name', data)

      if (!result.data) {
        speakerHandler(0, 'Bot Name Already Taken! You MUST Choose Another')
        validationReturn = false
        return false
      } else {
        console.log('result.data TELL ME: ', result.data)

        validationReturn = result
        console.log('validationReturn: ', validationReturn)
        return true
      }

    } catch (error) {
      console.error(error)
    }
  }
}

export type WorkTaskProp = {
  workDone: number,
  currentTask: string,
  nextTask: number,
  choreList: string,
  taskIsComplete: boolean
}

export type CounterProp = {
  choreClick: number,
  submitClick: number,
  progressInterval: number
}

export type DisabledStateProp = {
  isDisabledChore: boolean
  isDisabledDrill: boolean
  isDisabledBurglar: boolean
}

export type BotStartupProps = {
  prevBots: unknown[], 
  currentBot: any, 
  currentScore: Score, 
  executionState: ExecutionerStateProps,
  setScore: React.Dispatch<React.SetStateAction<Score>>,
}

export const botStartup = ({
  prevBots, 
  currentBot, 
  currentScore, 
  executionState,
  setScore,
}: BotStartupProps) => {
  console.log('botStartup()')
  prevBots.push(new Destroyer(currentBot.botName, currentBot.botType))

  const newestBot = prevBots[prevBots.length - 1] as Destroyer
  
  getScores(setScore)
  console.log('botStartup - post getScores score: ', currentScore)
  executioner({
    taskList: taskLists.insideTasks,
    currentBot,
    currentScore,
    count: 15,
    executionState,
  })
  // executioner(Task.insideTasks, newestBot, currentScore, 15, executionState)

  const creationData = {
    name: currentBot.botName,
    botType: currentBot.botType,
    workDone: executionState.workTasks.workDone,
    attack: newestBot.attackValue().attack,
    defense: newestBot.defenseValue().defense,
    speed: newestBot.speedValue().speed
  }

  axios.post('/api/bot', creationData).catch(err => console.error(err))

  speakerHandler((36575 / 1000), '')
    .then(() => executionState.setIsDisabled({ isDisabledChore: false, isDisabledDrill: false, isDisabledBurglar: true }))
    .then(() => executionState.setCounters({ ...executionState.counters, ...{ submitClick: 0 } }))
}

type CreateBotProps = BotStartupProps & ExecutionerStateProps & {
  e: React.MouseEventHandler<HTMLFormElement>
  // setScore,
  // currentBot,
  // workTasks,
  // setWorkTasks,
  setBot: React.Dispatch<React.SetStateAction<BotInfo>>
  // counters,
  // setCounters,
  // prevBots,
  // currentScore,
  // executionState
}

export const createBot = async ({
  e,
  setScore,
  currentBot,
  workTasks,
  setWorkTasks,
  setBot,
  counters,
  setCounters,
  prevBots,
  currentScore,
  executionState
}: CreateBotProps) => {

  console.log('createBot')

  //TODO: Is e.preventDefault() necessary here?
  // e.preventDefault()

  getScores(setScore)

  const botNameValidation = await botNameIsValid(currentBot)
  console.log('BEFORE botNameValidation IF statement - bot in bot creation with valid bot name !!!!!!!!: ', currentBot)

  if (botNameValidation) {
    setWorkTasks({ ...workTasks, ...{ workTasks: 5 } })
    console.log('bot in bot creation with valid bot name !!!!!!!!: ', currentBot)
    setBot({ ...currentBot, ...{ botName: currentBot.botName, semiPermaName: currentBot.botName || 'Bot' } })

    const { submitClick } = counters
    switch (currentBot.botName) {
      case '':
      case 'Bot':
        createValidation(submitClick, '')
        setCounters({ ...counters, ...{ submitClick: submitClick + 1 } })
        break

      default:
        createValidation(submitClick, currentBot.semiPermaName)
        botStartup({
          prevBots, 
          currentBot, 
          currentScore, 
          executionState,
          setScore
        })
        break
    }
  }

  speakerHandler(2, '')
}

export const getExecutionPropValues = ({
  taskList,
  currentBot,
  currentScore,
  count,
  executionState
}: ExecutionerProps) => ({
  taskList,
  currentBot,
  currentScore,
  count,
  executionState
} as ExecutionerProps)

type SelectChoresProps  = Pick<ExecutionerProps, 'executionState'> & {
  first: string[], 
  second: string[], 
  bot: any, 
  count: number
}

export const selectChores = ({
  first,
  second,
  bot,
  count,
  executionState
}: SelectChoresProps) => {
  const randChoice = () => Math.random()
  const executeFirstChoreSet = () => {
    executioner(getExecutionPropValues({
      taskList: first,
      currentBot: bot,
      currentScore: getScores,
      count,
      executionState
    }))

    executionState.setWorkTasks({ ...executionState.workTasks, ...{ choreList: 'Indoor Chores' } })
  }
  const executeSecondChoreSet = () => {
    executioner(getExecutionPropValues({
      taskList: second,
      currentBot: bot,
      currentScore: getScores,
      count,
      executionState
    }))

    executionState.setWorkTasks({ ...executionState.workTasks, ...{ choreList: 'Outdoor Chores' } })
  }

  randChoice() > 0.3
    ? executeFirstChoreSet()
    : executeSecondChoreSet()
}

type SaveWorkStateProps = {
  currentBot: BotInfo
  workTasks: ExecutionerStateProps['workTasks']
}

export const saveWorkState = async ({
  currentBot,
  workTasks
}: SaveWorkStateProps) => {
  console.log('saveWorkState() - bot: ', currentBot)
  let data = { workDone: workTasks.workDone, botName: currentBot.botName }
  console.log('saveWorkState - data to send: ', data)
  try {
    return await axios.post('/api/bot/score', data)
  } catch (err) {
    return console.error(err)
  }
}