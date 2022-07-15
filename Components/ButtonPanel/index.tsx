import React from 'react'
import ActionButton from '../ActionButton'


export default function ButtonPanel(props: any) {
  return (
    <>
      <ActionButton
        text="Do Chore Regimen"
        onClick={props.doChores}
        disabled={props.isDisabledChore}
        color="secondary"
        classes={{ disabled: 'light-grey' }}
        variant="contained"
      />

      <ActionButton
        text="Home Defense Drill Practice"
        onClick={props.drillPractice}
        disabled={props.isDisabledDrill}
        color="primary"
      />

      <ActionButton
        text="Burglar Attack"
        onClick={props.burglarDefense}
        disabled={props.isDisabledBurglar}
        color="secondary"
      />
    </>
  )
}
