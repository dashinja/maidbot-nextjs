import React, { ChangeEventHandler } from 'react'
import ActionButton from '../ActionButton'

type ButtonPapelProps = {
  formSubmit: (e: any) => Promise<void>
  botName: string
  botType: string
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  isDisabledChore: boolean
  isDisabledDrill: boolean
  isDisabledBurglar: boolean
  doChores: (e: any) => void
  drillPractice: (e: any) => void
  burglarDefense: (e: any) => void
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
}: ButtonPapelProps) {
  return (
    <>
      <ActionButton
        text="Do Chore Regimen"
        onClick={doChores}
        disabled={isDisabledChore}
      />

      <ActionButton
        text="Home Defense Drill Practice"
        onClick={drillPractice}
        disabled={isDisabledDrill}
      />

      <ActionButton
        text="Burglar Attack"
        onClick={burglarDefense}
        disabled={isDisabledBurglar}
      />
    </>
  )
}
