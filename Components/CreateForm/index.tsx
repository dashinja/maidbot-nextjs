import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import DropdownSelection from '../DropdownSelection'
import { DropDownSelectionProps } from '../DropdownSelection/DropdownSelection'
import PrimaryButton from '../PrimaryButton.tsx'

export type CreateFormProps = DropDownSelectionProps & {
  onClick: MouseEventHandler<HTMLFormElement>,
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
  botType: 'Unipedal' | 'Bipedal' | 'Quadrupedal' | 'Arachnid' | 'Radial' | 'Aeronautical',
}

//TODO: Remove botName?
export default function CreateForm({
  onClick,
  handleInputChange,
  botType,
  // botName,
  changeState,
  currentBot,
  setBot
}: CreateFormProps) {
  return (
    <>
      <div className='flex flex-col place-items-center text-text-normal'>
        <h1 className='my-4 text-3xl'>Maid - Bot Home Defense Systems </h1>
        <h3 className='my-4 text-xl'>Give your bot a name and choose it&apos;s type</h3>
        <h4 className='my-4 text-lg'>How much work can YOUR bot do? </h4>

        <form onSubmit={onClick}>
          <fieldset className='border border-1 px-2 py-2 text-xs'>
            <legend className=''>Create a Bot </legend>
            < label htmlFor='botName'>Name: </label>
            < input
              name="botName"
              id='botName'
              type="text"
              onChange={handleInputChange}
              value={changeState && changeState.key}
              placeholder="Enter Bot Name Here"
              className={'bg-transparent'}
            />

            <DropdownSelection
              {...{ changeState, currentBot, setBot }}
              className="bg-background"
            />

            <PrimaryButton name={'submit'}>Submit</PrimaryButton>

          </fieldset>
        </form>
      </div>
    </>
  )
}
