import React, { ChangeEventHandler, MouseEventHandler } from 'react'

type createFormProps = {
  onClick: MouseEventHandler<HTMLFormElement>,
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
  botType: string,
  botName: string
  changeState: { [key: string]: string}
}

//TODO: Remove botName?
export default function CreateForm({
  onClick,
  handleInputChange,
  botType,
  botName,
  changeState
}: createFormProps ) {
  return (
    <>
      <div>
        <h1>Maid - Bot Home Defense Systems </h1>
        <h3>Give your bot a name and choose it&apos;s type</h3>
        <h4>How much work can YOUR bot do? </h4>

        <form onSubmit={onClick}>
          <fieldset>
            <legend>Create a Bot </legend>
            < label htmlFor='botName'>Name: </label>
              < input
                name="botName"
                id='botName'
                type="text"
                onChange={handleInputChange}
                value={changeState && changeState.key}
                placeholder="Enter Bot Name Here"
                className={''}
              />
              < span > Type: </span>

            <label htmlFor='botType'></label>
            < select
              name="botType"
              id="botType"
              onChange={handleInputChange}
              className={''}
              value={changeState?.key || botType}
            >
              <option value="Unipedal" > Unipedal </option>
              < option value="Bipedal" > Bipedal </option>
              < option value="Quadrupedal" > Quadrupedal </option>
              < option value="Arachnid" > Arachnid </option>
              < option value="Radial" > Radial </option>
              < option value="Aeronautical" > Aeronautical </option>
            </select>

            < button type="submit">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  )
}