import React, { ChangeEventHandler } from 'react'
import { BurglarDefenseProps, CreateBotProps, DoChoresProps, DrillPracticeProps } from '../../Utils/bots'
import ActionButton from '../ActionButton'

type ButtonPapelProps = {
  formSubmit: (e: any) => Promise<void>
  botName: string
  botType: string
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  isDisabledChore: boolean
  isDisabledDrill: boolean
  isDisabledBurglar: boolean
  doChores: ({ e, executionState, prevBots, currentBot, }: DoChoresProps) => void
  drillPractice: ({ e, prevBots, currentBot, executionState, currentScore, }: DrillPracticeProps) => void
  burglarDefense: ({ e, prevBots, currentBot, currentScore, executionState, setCurrentScore, setWinner }: BurglarDefenseProps) => void,
  botState: CreateBotProps,
  setWinner: React.Dispatch<React.SetStateAction<string>>

}

//TODO: Remove unused props?
export default function ButtonPanel({
  formSubmit,
  botName,
  botType,
  handleInputChange,
  isDisabledChore,
  isDisabledDrill,
  isDisabledBurglar,
  doChores,
  drillPractice,
  burglarDefense,
  botState,
  setWinner
}: ButtonPapelProps) {
  
  const {currentBot, currentScore, executionState, prevBots, setBot, setCurrentScore} = botState

  return (
    <>
      <ActionButton
        text="Do Chore Regimen"
        onClick={(e) => doChores({
          e,
          currentBot,
          executionState,
          prevBots,
        })}
        disabled={isDisabledChore}
      />

      <ActionButton
        text="Home Defense Drill Practice"
        onClick={(e) => drillPractice({
          e,
          prevBots,
          currentBot,
          executionState,
          currentScore,
        })}
        disabled={isDisabledDrill}
      />

      <ActionButton
        text="Burglar Attack"
        onClick={(e) => burglarDefense({
          e,
          currentBot,
          currentScore,
          executionState,
          prevBots,
          setCurrentScore,
          setWinner
        })}
        disabled={isDisabledBurglar}
      />
    </>
  )
}
