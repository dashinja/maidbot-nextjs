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

export default function ButtonPanel(props: ButtonPapelProps) {
  return (
    <>
      <ActionButton
        text="Do Chore Regimen"
        onClick={props.doChores}
        disabled={props.isDisabledChore}
      />

      <ActionButton
        text="Home Defense Drill Practice"
        onClick={props.drillPractice}
        disabled={props.isDisabledDrill}
      />

      <ActionButton
        text="Burglar Attack"
        onClick={props.burglarDefense}
        disabled={props.isDisabledBurglar}
      />
    </>
  )
}
