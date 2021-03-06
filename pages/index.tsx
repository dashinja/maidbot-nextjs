import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

//Helpers and Constants
import { CONSTANTS } from '../Utils/constants'
import { Task, Pattern } from '../Utils/patterns'
import { speakerHandler, createValidation, choreSequence, femaleDefault, femaleDefensive, ExecutionerStateProps, executioner } from '../Utils/helpers'

//Classes
import Destroyer from '../Utils/bots'
import Burglar from '../Utils/burglar'

//Components
import InfoPanel from '../Components/InfoPanel/index'
import ButtonPanel from '../Components/ButtonPanel/index'
import CreateForm from '../Components/CreateForm/index'

let createdBots: any[] = []

type BotInfo = {
  botName: string,
  botType: string,
  semiPermaName: string
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

type DisabledStateProp = {
  isDisabledChore: boolean
  isDisabledDrill: boolean
  isDisabledBurglar: boolean
}
const App = () => {

  const [bot, setbot] = useState<BotInfo>({
    botName: '',
    botType: 'Bibedal',
    semiPermaName: 'Bot'
  })
  const [workTasks, setWorkTasks] = useState<WorkTaskProp>({
    workDone: 0,
    currentTask: 'Awaiting Bot Creation',
    nextTask: 0,
    choreList: '',
    taskIsComplete: true
  })
  const [isDisabled, setIsDisabled] = useState<DisabledStateProp>({
    isDisabledChore: true,
    isDisabledBurglar: true,
    isDisabledDrill: true
  })
  const [score, setScore] = useState('high score')
  const [winner, setWinner] = useState()
  const [counters, setCounters] = useState<CounterProp>({
    choreClick: 0,
    submitClick: 0,
    progressInterval: 0
  })
  const [changeState, setChangeState] = useState<{ [key: string]: string }>()

  const executionState = {
    counters,
    setCounters,
    workTasks,
    setWorkTasks
  } as ExecutionerStateProps

  const getScores = async () => {
    try {
      const allScores = await axios.get('/api/bot/score')
      console.log('GET: api/bot/name: ', await allScores.data)
      setScore(allScores.data)
    } catch (error) {
      console.error(error)
    }
  }

  const botNameIsValid = async () => {
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
          validationReturn = result
          console.log('validationReturn: ', validationReturn)
          return true
        }

      } catch (error) {
        console.error(error)
      }
    }
  }

  const botStartup = () => {
    console.log('botStartup()')
    createdBots.push(new Destroyer(bot.botName, bot.botType))

    const newestBot = createdBots[createdBots.length - 1]
    getScores()
    executioner(Task.insideTasks, newestBot, score, 15, executionState)

    const creationData = {
      name: bot.botName,
      botType: bot.botType,
      workDone: workTasks.workDone,
      attack: newestBot.attackValue(bot.botName).attack,
      defense: newestBot.defenseValue(bot.botName).defense,
      speed: newestBot.speedValue(bot.botName).speed
    }

    axios.post('/api/bot', creationData).catch(err => console.error(err))

    speakerHandler((36575 / 1000), '')
      .then(() => setIsDisabled({ isDisabledChore: false, isDisabledDrill: false, isDisabledBurglar: true }))
      .then(() => setCounters({ ...counters, ...{ submitClick: 0 } }))
  }

  const createBot = async (e) => {
    console.log('createBot')
    e.preventDefault()
    getScores()

    const botNameValidation = await botNameIsValid()

    if (botNameValidation) {
      setWorkTasks({ ...workTasks, ...{ workTasks: 5 } })
      setbot({ ...bot, ...{ botName: bot.botName, semiPermaName: bot.botName || 'Bot' } })

      const { submitClick } = counters
      switch (bot.botName) {
        case '':
        case 'Bot':
          createValidation(submitClick, '')
          setCounters({ ...counters, ...{ submitClick: submitClick + 1 } })
          break

        default:
          createValidation(submitClick, bot.semiPermaName)
          botStartup()
          break
      }
    }

    speakerHandler(2, '')
      .then(() => setbot({ ...bot, ...{ botType: 'Bipedal', botName: '' } }))
  }

  const selectChores = (first: string[], second: string[], bot: any, count: number) => {
    const randChoice = () => Math.random()
    const executeFirstChoreSet = () => {
      executioner(first, bot, getScores, count, executionState)

      setWorkTasks({ ...workTasks, ...{ choreList: 'Indoor Chores' } })
    }
    const executeSecondChoreSet = () => {
      executioner(second, bot, getScores, count, executionState)
      setWorkTasks({ ...workTasks, ...{ choreList: 'Outdoor Chores' } })
    }

    randChoice() > 0.3
      ? executeFirstChoreSet()
      : executeSecondChoreSet()
  }

  const saveWorkState = async () => {
    let data = { workDone: workTasks.workDone, botName: bot.botName }
    try {
      return await axios.post('/api/bot/score', data)
    } catch (err) {
      return console.error(err)
    }
  }

  const doChores = (e: any ) => {
    e.preventDefault()

    setIsDisabled({
      isDisabledBurglar: true,
      isDisabledDrill: true,
      isDisabledChore: true,
    })

    setWorkTasks({ ...workTasks, ...{ taskIsComplete: false } })
    setCounters({ ...counters, ...{ choreClick: counters.choreClick + 1 } })

    switch (counters.choreClick) {
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

    selectChores(Task.insideTasks, Task.outsideTasks, createdBots[createdBots.length - 1], 16)

    saveWorkState()

    const workingOnIt = setTimeout(() => {
      if (workTasks.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.LOOK)
      } else {
        clearTimeout(workingOnIt)
      }
    }, 50 * 1000)

    const dontBother = setTimeout(() => {
      if (workTasks.taskIsComplete === false) {
        femaleDefault.and(CONSTANTS.SPEECH.CHORES.BOTHER)
      } else {
        clearTimeout(dontBother)
      }
    }, 60 * 1000)

    speakerHandler((38575 / 1000), '')
      .then(() => {
        if (workTasks.taskIsComplete === false) {
          speakerHandler(0, CONSTANTS.SPEECH.CHORES.LONG)
        } else {
          setIsDisabled({
            isDisabledBurglar: false,
            isDisabledDrill: false,
            isDisabledChore: false,
          })

          clearTimeout(workingOnIt)
          clearTimeout(dontBother)
        }
      })
    speakerHandler(77, '')
      .then(() => setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false }))
  }

  function drillPractice(e: any) {
    e.preventDefault()

    femaleDefault.and(`${bot.semiPermaName || 'Bot'} activated and ready!}`)

    const randChoice = Math.floor(Math.random() * Pattern.length)
    const choice = Pattern[randChoice]

    switch (randChoice) {
      case 0:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.ALPHA)
        setWorkTasks({ ...workTasks, ...{ choreList: 'Alpha Pattern' } })
        break

      case 1:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.BETA)
        setWorkTasks({ ...workTasks, ...{ choreList: 'Beta Pattern' } })
        break

      case 2:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.DELTA)
        setWorkTasks({ ...workTasks, ...{ choreList: 'Delta Pattern' } })
        break

      case 3:
        femaleDefault.and(CONSTANTS.SPEECH.DRILL_PRACTICE.OMEGA)
        setWorkTasks({ ...workTasks, ...{ choreList: 'Omega Pattern' } })
        break

      default:
        break
    }

    executioner(choice, createdBots[createdBots.length - 1], getScores, 16, executionState)

    setWorkTasks({ ...workTasks, ...{ workDone: workTasks.workDone + 5 } })
    setIsDisabled({ isDisabledBurglar: true, isDisabledChore: true, isDisabledDrill: true })

    speakerHandler(14, '')
      .then(() => setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false }))

    saveWorkState()
  }

  const saveBurglarState = async () => {
    let data = {
      workDone: workTasks.workDone,
      botName: createdBots[createdBots.length - 1].name
    }

    try {
      await axios.post('/api/bot/score', data)
      axios.get('/api/bot/score')
        .then(allScores => {
          setWorkTasks({ ...workTasks, ...{ workDone: counters.progressInterval } })
          setScore(allScores.data)
        })
        .catch(err => console.error(err))
    } catch (err_1) {
      return console.error(err_1)
    }
  }

  const burglarDefense = (e: any) => {
    e.preventDefault()

    setIsDisabled({ isDisabledBurglar: true, isDisabledChore: true, isDisabledDrill: true })
    setCounters({ ...counters, ...{ progressInterval: counters.progressInterval + 5 } })

    femaleDefensive.speak(CONSTANTS.SPEECH.DEFENSE.ALERT)
    const intruder = new Burglar()
    intruder.attackValue(createdBots[createdBots.length - 1])

    speakerHandler(5.75, '')
      .then(() => {
        setIsDisabled({ isDisabledBurglar: false, isDisabledChore: false, isDisabledDrill: false })
        saveBurglarState()
      })

    speakerHandler(16, '')
      .then(() => setWinner(undefined))
  }

  const bonusSass = () => {
    const bonus = CONSTANTS.SPEECH.BONUS.SASS
    const choice = Math.ceil(Math.random() * bonus.length - 1)
    const bonusChoice = bonus[choice]
    femaleDefault.and(bonusChoice)
  }

  const handleInputChange = (event: { target: any }) => {
    const { target } = event
    switch (target.type) {
      case 'text':
        setbot({ ...bot, ...{ botName: target.value } })
        break
      case 'select-one':
        setbot({ ...bot, ...{ botType: target.value } })
        break
      case 'click':
        break

      default:
        break
    }
    const name = target.name
    setChangeState({ [name]: target.value })
  }

  return (
    <>
      <CreateForm
        onClick={createBot}
        botName={bot.botName}
        botType={bot.botType}
        handleInputChange={handleInputChange}
        changeState={changeState}
      />
      <ButtonPanel
        formSubmit={createBot}
        botName={bot.botName}
        botType={bot.botType}
        handleInputChange={handleInputChange}
        doChores={doChores}
        isDisabledChore={isDisabled.isDisabledChore}
        drillPractice={drillPractice}
        isDisabledDrill={isDisabled.isDisabledDrill}
        burglarDefense={burglarDefense}
        isDisabledBurglar={isDisabled.isDisabledBurglar}
      />
      <InfoPanel
        currentTask={workTasks.currentTask}
        semiPermaName={bot.semiPermaName}
        nextTask={workTasks.nextTask}
        progressInterval={counters.progressInterval} //shows "work done"
        winner={winner}
        score={score} // taken from database
        bonusSass={bonusSass}
      />
    </>
  )
}

export default App