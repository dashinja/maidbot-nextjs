import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

//Helpers and Constants
import { CONSTANTS } from '../Utils/constants'
import { taskLists, Pattern } from '../Utils/patterns'
import { speakerHandler, createValidation, choreSequence, femaleDefault, femaleDefensive, ExecutionerStateProps, executioner, ExecutionerProps } from '../Utils/helpers'

//Classes
import Destroyer, { bonusSass, BotInfo, botNameIsValid, botStartup, burglarDefense, CounterProp, createBot, DisabledStateProp, doChores, drillPractice, getScores, saveWorkState, Score, selectChores, WorkTaskProp } from '../Utils/bots'
import Burglar from '../Utils/burglar'

//Components
import InfoPanel from '../Components/InfoPanel/index'
import ButtonPanel from '../Components/ButtonPanel/index'
import CreateForm from '../Components/CreateForm/index'

let createdBots: any[] = []

const App = () => {

  const [currentBot, setBot] = useState<BotInfo>({
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
  const [winner, setWinner] = useState<Destroyer['name']>()
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



  const handleInputChange = (event: { target: any }) => {
    const { target } = event
    switch (target.type) {
      case 'text':
        setBot({ ...currentBot, ...{ botName: target.value } })
        break
      case 'select-one':
        setBot({ ...currentBot, ...{ botType: target.value } })
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
      //TODO: Relook at this onClick typing
        onClick={createBot as unknown as React.MouseEventHandler<HTMLFormElement>}
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
        progressInterval={counters.progressInterval}
        winner={winner}
        score={score}
        bonusSass={bonusSass}
      />
    </>
  )
}

export default App