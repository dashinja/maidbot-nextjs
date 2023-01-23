import React from 'react'

type ActionButtonProps = {
  text: string
  onClick: (e: any) => void
  disabled: boolean
}

export const enabledButtonClasses = [
  'px-6',
  'py-2',
  'rounded-sm',
  'mr-0.5',
  'text-text-normal',
  'text-lg',
  'bg-red-one',
].join(' ')

export const disabledButtonClasses = [
  'bg-button-disabled',
  'px-6',
  'py-2',
  'rounded-sm',
  'mr-0.5',
  'text-lg',
  'text-button-disabled-text',
].join(' ')

function ActionButton(
  {
    disabled,
    onClick,
    text,
    ...props
  }: ActionButtonProps
) {

  return (
    <button
      className={
        disabled
          ? disabledButtonClasses
          : enabledButtonClasses
      }
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  )
}

export default ActionButton
