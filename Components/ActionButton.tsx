import React from 'react'

type ActionButtonProps = {
  text: string
  onClick: (e: any) => void
  disabled: boolean
}

export const enabledButtonClasses = [
  'bg-red-500',
  'px-2',
  'rounded-sm',
  'mr-1'
].join(' ')

const disabledButtonClasses = [
  'bg-blue-800',
  'px-2',
  'rounded-sm',
  'mr-1',
  'text-white'
].join(' ')

function ActionButton(props: ActionButtonProps) {
  //TODO: Revisit or delete
  // const standby = "p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"


  return (
    <button
      className={props.disabled ? disabledButtonClasses : enabledButtonClasses}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default ActionButton
