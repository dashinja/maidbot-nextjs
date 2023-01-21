import React, { useState } from 'react'

import Destroyer, { bonusSass, BotInfo, burglarDefense, CounterProp, createBot, DisabledStateProp, doChores, drillPractice, Score, WorkTaskProp } from '../Utils/bots'

import InfoPanel from '../Components/InfoPanel/index'
import ButtonPanel from '../Components/ButtonPanel/index'
import CreateForm from '../Components/CreateForm/index'

const App = () => {

  const [currentBot, setBot] = useState<BotInfo>({
    botName: '',
    botType: 'Bibedal',
    semiPermaName: 'Bot'
  })
  const [workTasks, _setWorkTasks] = useState<WorkTaskProp>({
    workDone: 0,
    currentTask: 'Awaiting Bot Creation',
    nextTask: 0,
    choreList: '',
    taskIsComplete: true
  })
  const [isDisabled, _setIsDisabled] = useState<DisabledStateProp>({
    isDisabledChore: true,
    isDisabledBurglar: true,
    isDisabledDrill: true
  })
  const [score, _setScore] = useState<Score>('high score')
  const [winner, _setWinner] = useState<Destroyer['name']>()
  const [counters, _setCounters] = useState<CounterProp>({
    choreClick: 0,
    submitClick: 0,
    progressInterval: 0
  })
  const [changeState, setChangeState] = useState<{ [key: string]: string }>()

  //TODO Where does this really go?

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