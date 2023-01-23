import React, { useEffect, useState } from 'react'
import Destroyer, { bonusSass, BotInfo, burglarDefense, CounterProp, createBot, CreateBotProps, DisabledStateProp, doChores, drillPractice, getPrevBots, getScores, Score, WorkTaskProp } from '../Utils/bots'
import InfoPanel from '../Components/InfoPanel/index'
import ButtonPanel from '../Components/ButtonPanel/index'
import CreateForm from '../Components/CreateForm/index'
import { ChangeStateProp } from './api/bot'

const App = () => {

  const [currentBot, setBot] = useState<BotInfo>({
    botName: '',
    botType: 'Bipedal',
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
  const [currentScore, setCurrentScore] = useState<Score>('high score')
  const [winner, setWinner] = useState<Destroyer['name']>()
  const [counters, setCounters] = useState<CounterProp>({
    choreClick: 0,
    submitClick: 0,
    progressInterval: 0
  })


  const [changeState, setChangeState] = useState<ChangeStateProp>()
  const [prevBots, setPrevBots] = useState<unknown[]>()

  
  const executionState = {
    workTasks,
    setWorkTasks,
    counters,
    setCounters,
    setIsDisabled,
  }

  useEffect(() => {
    const initializeDate = async () => {
      await Promise.all([
        await getPrevBots(setPrevBots),
        await getScores(setCurrentScore)
      ])
    }

    initializeDate()
  }, [])

  const handleInputChange = (event: { target: any }) => {
    const { target } = event
    switch (target.type) {
      case 'text':
        setBot({ ...currentBot, ...{ botName: target.value } })
        break
      case 'select-one':
        setBot({ ...currentBot, ...{ botType: target.value } })
        break
      default:
        break
    }
    const name = target.name
    setChangeState({ [name]: target.value })
  }

  const botStateCollection = {
    setCurrentScore,
    currentBot,
    setBot,
    prevBots,
    currentScore,
    executionState,
  } as CreateBotProps

  return (
    <>
      <CreateForm
        //TODO: Relook at this onClick typing
        onClick={(e) => createBot({
          setCurrentScore,
          currentBot,
          setBot,
          prevBots,
          currentScore,
          executionState,
          e
        }) as unknown as React.MouseEventHandler<HTMLFormElement>}
        botName={currentBot.botName}
        botType={currentBot.botType}
        handleInputChange={handleInputChange}
        changeState={changeState}
      />
      <ButtonPanel
        doChores={doChores}
        isDisabledChore={isDisabled.isDisabledChore}
        drillPractice={drillPractice}
        isDisabledDrill={isDisabled.isDisabledDrill}
        burglarDefense={burglarDefense}
        isDisabledBurglar={isDisabled.isDisabledBurglar}
        botState={botStateCollection}
        setWinner={setWinner}
      />
      <InfoPanel
        currentTask={workTasks.currentTask}
        semiPermaName={currentBot.semiPermaName}
        nextTask={workTasks.nextTask}
        progressInterval={counters.progressInterval}
        winner={winner}
        score={currentScore}
        bonusSass={bonusSass}
      />
    </>
  )
}

export default App