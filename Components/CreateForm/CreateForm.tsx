import React, {
  ChangeEventHandler,
  MouseEventHandler,
} from 'react'
import DropdownSelection from '../DropdownSelection'
import { DropDownSelectionProps } from '../DropdownSelection/DropdownSelection'
import PrimaryButton from '../PrimaryButton.tsx'

export type CreateFormProps =
  DropDownSelectionProps & {
    onClick: MouseEventHandler<HTMLFormElement>
    handleInputChange: ChangeEventHandler<
      | HTMLInputElement
      | HTMLSelectElement
    >
    botType:
      | 'Unipedal'
      | 'Bipedal'
      | 'Quadrupedal'
      | 'Arachnid'
      | 'Radial'
      | 'Aeronautical'
  }

export function CreateForm({
  onClick,
  handleInputChange,
  changeState,
  currentBot,
  setBot,
}: CreateFormProps) {
  return (
    <>
      <div className="flex flex-col place-items-center text-text-normal">
        <h1 className="my-5 text-3xl font-bold">
          Maid - Bot Home Defense
          Systems{' '}
        </h1>
        <h3 className="my-5 text-xl font-bold">
          Give your bot a name and
          choose it&apos;s type
        </h3>
        <h4 className="my-5 text-md font-bold">
          How much work can YOUR bot do?{' '}
        </h4>

        <form onSubmit={onClick}>
          <fieldset className="border border-0.5 px-2 pb-2 -mt-1 text-md">
            <legend className="">
              Create a Bot{' '}
            </legend>
            <label htmlFor="botName">
              Name:{' '}
            </label>
            <input
              name="botName"
              id="botName"
              type="text"
              onChange={
                handleInputChange
              }
              value={
                changeState &&
                changeState.key
              }
              placeholder="Enter Bot Name Here"
              className={
                'bg-background font-semibold border border-b-1.5 border-t-0 border-l-0 border-r-0 border-input-box-bottom pb-1'
              }
            />

            <DropdownSelection
              {...{
                changeState,
                currentBot,
                setBot,
              }}
              className="bg-background font-semibold border border-b-1.5 border-t-0 border-l-0 border-r-0 border-input-box-bottom pb-1"
            />

            <PrimaryButton
              name={'submit'}
            >
              Submit
            </PrimaryButton>
          </fieldset>
        </form>
      </div>
    </>
  )
}
