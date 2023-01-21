import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

//Helpers and Constants
import { CONSTANTS } from '../Utils/constants'
import { taskLists, Pattern } from '../Utils/patterns'
import { speakerHandler, createValidation, choreSequence, femaleDefault, femaleDefensive, ExecutionerStateProps, executioner, ExecutionerProps } from '../Utils/helpers'

//Classes
import Destroyer, { BotInfo, botNameIsValid, botStartup, CounterProp, DisabledStateProp, getScores, Score, WorkTaskProp } from '../Utils/bots'
import Burglar from '../Utils/burglar'

//Components
import InfoPanel from '../Components/InfoPanel/index'
import ButtonPanel from '../Components/ButtonPanel/index'
import CreateForm from '../Components/CreateForm/index'

let createdBots: any[] = []

const App = () => {

  const [currentBot, setbot] = useState<BotInfo>({
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
  const [score, setScore] = useState<Score>('high score')
  const [winner, setWinner] = useState()
  const [counters, setCounters] = useState<CounterProp>({
    choreClick: 0,
    submitClick: 0,
    progressInterval: 0
  })
  const [changeState, setChangeState] = useState<{ [key: string]: string }>()

  const defaultExecutionState = {
    counters,
    setCounters,
    workTasks,
    setWorkTasks
  } as ExecutionerStateProps

  const getExecutionPropValues = ({
    taskList: taskList,
    currentBot,
    currentScore,
    count,
    executionState = defaultExecutionState
  }: ExecutionerProps) => ({
    taskList: taskList, //createdBots,
    currentBot,
    currentScore,
    count,
    executionState
  } as ExecutionerProps)

  // const botStartup = () => {
  //   console.log('botStartup()')
  //   createdBots.push(new Destroyer(bot.botName, bot.botType))

  //   const newestBot = createdBots[createdBots.length - 1]
  //   getScores(setScore)
  //   console.log('botStartup - post getScores score: ', score)
  //   executioner(Task.insideTasks, newestBot, score, 15, executionState)

  //   const creationData = {
  //     name: bot.botName,
  //     botType: bot.botType,
  //     workDone: workTasks.workDone,
  //     attack: newestBot.attackValue(bot.botName).attack,
  //     defense: newestBot.defenseValue(bot.botName).defense,
  //     speed: newestBot.speedValue(bot.botName).speed
  //   }

  //   axios.post('/api/bot', creationData).catch(err => console.error(err))

  //   speakerHandler((36575 / 1000), '')
  //     .then(() => setIsDisabled({ isDisabledChore: false, isDisabledDrill: false, isDisabledBurglar: true }))
  //     .then(() => setCounters({ ...counters, ...{ submitClick: 0 } }))
  // }

  const createBot = async (e) => {
    console.log('createBot')
    e.preventDefault()
    getScores(setScore)

    const botNameValidation = await botNameIsValid(currentBot)
    console.log('BEFORE botNameValidation IF statement - bot in bot creation with valid bot name !!!!!!!!: ', currentBot)

    if (botNameValidation) {
      setWorkTasks({ ...workTasks, ...{ workTasks: 5 } })
      console.log('bot in bot creation with valid bot name !!!!!!!!: ', currentBot)
      setbot({ ...currentBot, ...{ botName: currentBot.botName, semiPermaName: currentBot.botName || 'Bot' } })

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
            prevBots: createdBots, 
            currentBot, 
            currentScore: score, 
            executionState: defaultExecutionState,
            setScore
          })
          break
      }
    }

    speakerHandler(2, '')
  }

  const selectChores = (first: string[], second: string[], bot: any, count: number) => {
    const randChoice = () => Math.random()
    const executeFirstChoreSet = () => {
      executioner(getExecutionPropValues({
        taskList: first,
        currentBot: bot,
        currentScore: getScores,
        count,
      }))
      // executioner(first, bot, getScores, count, executionState)

      setWorkTasks({ ...workTasks, ...{ choreList: 'Indoor Chores' } })
    }
    const executeSecondChoreSet = () => {
      executioner(getExecutionPropValues({
        taskList: second,
        currentBot: bot,
        currentScore: getScores,
        count,
      }))
      // executioner(second, bot, getScores, count, defaultExecutionState)
      setWorkTasks({ ...workTasks, ...{ choreList: 'Outdoor Chores' } })
    }

    randChoice() > 0.3
      ? executeFirstChoreSet()
      : executeSecondChoreSet()
  }

  const saveWorkState = async () => {
    console.log('saveWorkState() - bot: ', currentBot)
    let data = { workDone: workTasks.workDone, botName: currentBot.botName }
    console.log('saveWorkState - data to send: ', data)
    try {
      return await axios.post('/api/bot/score', data)
    } catch (err) {
      return console.error(err)
    }
  }

  const doChores = (e: any) => {
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

    selectChores(taskLists.insideTasks, taskLists.outsideTasks, createdBots[createdBots.length - 1], 16)

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
    console.log('drillPractice')
    femaleDefault.and(`${currentBot.semiPermaName || 'Bot'} activated and ready!}`)

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

    executioner(getExecutionPropValues({
      taskList: choice,
      currentBot: createdBots[createdBots.length - 1],
      currentScore: getScores,
      count: 16,
    }))
    // executioner(choice, createdBots[createdBots.length - 1], getScores, 16, defaultExecutionState)

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
        setbot({ ...currentBot, ...{ botName: target.value } })
        break
      case 'select-one':
        setbot({ ...currentBot, ...{ botType: target.value } })
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
        botName={currentBot.botName}
        botType={currentBot.botType}
        handleInputChange={handleInputChange}
        changeState={changeState}
      />
      <ButtonPanel
        formSubmit={createBot}
        botName={currentBot.botName}
        botType={currentBot.botType}
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
        semiPermaName={currentBot.semiPermaName}
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