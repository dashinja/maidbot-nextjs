import axios, { AxiosResponse } from 'axios'
import Burglar from './burglar'
import { CONSTANTS } from './constants'
import { choreSequence, createValidation, executioner, ExecutionerProps, ExecutionerStateProps, femaleDefault, femaleDefensive, speakerHandler } from './helpers'
import {Pattern, taskLists} from './patterns'

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

type CreateBotProps = BotStartupProps & {
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
  // workTasks,
  // setWorkTasks,
  setBot,
  // counters,
  // setCounters,
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
    executionState.setWorkTasks({ ...executionState.workTasks, ...{ workTasks: 5 } })
    console.log('bot in bot creation with valid bot name !!!!!!!!: ', currentBot)
    setBot({ ...currentBot, ...{ botName: currentBot.botName, semiPermaName: currentBot.botName || 'Bot' } })

    const { submitClick } = executionState.counters
    switch (currentBot.botName) {
      case '':
      case 'Bot':
        createValidation(submitClick, '')
        executionState.setCounters({ ...executionState.counters, ...{ submitClick: submitClick + 1 } })
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

type DoChoresProps = BotStartupProps & {
  e: any
}

export const doChores = ({
  e,
  executionState,
  prevBots,
  currentBot,
}: DoChoresProps) => {
  e.preventDefault()

  executionState.setIsDisabled({
    isDisabledBurglar: true,
    isDisabledDrill: true,
    isDisabledChore: true,
  })

  executionState.setWorkTasks({ ...executionState.workTasks, ...{ taskIsComplete: false } })
  executionState.setCounters({ ...executionState.counters, ...{ choreClick: executionState.counters.choreClick + 1 } })

  switch (executionState.counters.choreClick) {
    case 0:
      choreSequence(16)
      break

    case 1:
      choreSequence(17)
      break

    case 2:
      choreSequence(18)
      break

    default:
      break
  }

  selectChores({
    first: taskLists.insideTasks, 
    second: taskLists.outsideTasks, 
    bot: prevBots[prevBots.length - 1], 
    count: 16,
    executionState
  })
  
  saveWorkState({
    currentBot,
    workTasks: executionState.workTasks
  })

  const workingOnIt = setTimeout(() => {
    if (executionState.workTasks.taskIsComplete === false) {
      femaleDefault.and(CONSTANTS.SPEECH.CHORES.LOOK)
    } else {
      clearTimeout(workingOnIt)
    }
  }, 50 * 1000)

  const dontBother = setTimeout(() => {
    if (executionState.workTasks.taskIsComplete === false) {
      femaleDefault.and(CONSTANTS.SPEECH.CHORES.BOTHER)
    } else {
      clearTimeout(dontBother)
    }
  }, 60 * 1000)

  speakerHandler((38575 / 1000), '')
    .then(() => {
      if (executionState.workTasks.taskIsComplete === false) {
        speakerHandler(0, CONSTANTS.SPEECH.CHORES.LONG)
      } else {
        executionState.setIsDisabled({
          isDisabledBurglar: false,
          isDisabledDrill: false,
          isDisabledChore: false,
        })

        clearTimeout(workingOnIt)
        clearTimeout(dontBother)
      }
    })
  speakerHandler(77, '')
    .then(() => executionState.setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false }))
}

type DrillPracticeProps = BotStartupProps & {
  e: any
}

export function drillPractice({
  e,
  prevBots,
  currentBot,
  executionState
}: DrillPracticeProps) {
  e.preventDefault()
  console.log('drillPractice')
  femaleDefault.and(`${currentBot.semiPermaName || 'Bot'} activated and ready!}`)

  const randChoice = Math.floor(Math.random() * Pattern.length)
  const choice = Pattern[randChoice]

  switch (randChoice) {
    case 0:
      femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.ALPHA)
      executionState.setWorkTasks({ ...executionState.workTasks, ...{ choreList: 'Alpha Pattern' } })
      break

    case 1:
      femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.BETA)
      executionState.setWorkTasks({ ...executionState.workTasks, ...{ choreList: 'Beta Pattern' } })
      break

    case 2:
      femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.DELTA)
      executionState.setWorkTasks({ ...executionState.workTasks, ...{ choreList: 'Delta Pattern' } })
      break

    case 3:
      femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.OMEGA)
      executionState.setWorkTasks({ ...executionState.workTasks, ...{ choreList: 'Omega Pattern' } })
      break

    default:
      break
  }

  executioner(getExecutionPropValues({
    taskList: choice,
    currentBot: prevBots[prevBots.length - 1],
    currentScore: getScores,
    count: 16,
    executionState
  }))

  executionState.setWorkTasks({ ...executionState.workTasks, ...{ workDone: executionState.workTasks.workDone + 5 } })
  executionState.setIsDisabled({ isDisabledBurglar: true, isDisabledChore: true, isDisabledDrill: true })

  speakerHandler(14, '')
    .then(() => executionState.setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false }))

  saveWorkState({
    currentBot,
    workTasks: executionState.workTasks
  })
}

type SaveBurglarStateProps = BotStartupProps

export const saveBurglarState = async ({
  prevBots,
  executionState,
  setScore
}: SaveBurglarStateProps) => {
  let data = {
    workDone: executionState.workTasks.workDone,
    botName: (prevBots[prevBots.length - 1] as DestroyerType).name 
  }

  try {
    await axios.post('/api/bot/score', data)
    axios.get('/api/bot/score')
      .then(allScores => {
        executionState.setWorkTasks({ ...executionState.workTasks, ...{ workDone: executionState.counters.progressInterval } })
        setScore(allScores.data)
      })
      .catch(err => console.error(err))
  } catch (err_1) {
    return console.error(err_1)
  }
}

type BurglarDefenseProps = BotStartupProps & {e: any, setWinner: React.Dispatch<React.SetStateAction<string>>
}

export const burglarDefense = ({
  e,
  prevBots,
  currentBot,
  currentScore,
  executionState,
  setScore,
  setWinner
}: BurglarDefenseProps) => {
  e.preventDefault()

  executionState.setIsDisabled({ isDisabledBurglar: true, isDisabledChore: true, isDisabledDrill: true })
  executionState.setCounters({ ...executionState.counters, ...{ progressInterval: executionState.counters.progressInterval + 5 } })

  femaleDefensive.speak(CONSTANTS.SPEECH.DEFENSE.ALERT)
  const intruder = new Burglar()
  intruder.attackValue(prevBots[prevBots.length - 1] as DestroyerType)

  speakerHandler(5.75, '')
    .then(() => {
      executionState.setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false })
      saveBurglarState({
        prevBots,
        currentBot,
        currentScore,
        executionState,
        setScore
      })
    })

  speakerHandler(16, '')
    .then(() => setWinner(undefined))
}

export const bonusSass = () => {
  const bonus = CONSTANTS.SPEECH.BONUS.SASS
  const choice = Math.ceil(Math.random() * bonus.length - 1)
  const bonusChoice = bonus[choice]
  femaleDefault.and(bonusChoice)
}