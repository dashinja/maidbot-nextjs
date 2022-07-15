import React from 'react'

export default function CreateForm(props: any) {
  return (
    <>
      <div>
        <h1>Maid - Bot Home Defense Systems </h1>
        <h3>Give your bot a name and choose it&apos;s type</h3>
        <h4>How much work can YOUR bot do? </h4>

        <form onSubmit={props.onSubmit}>
          <fieldset>
            <legend>Create a Bot </legend>
            < label >
              <span>Name: </span>
              < input
                name="botName"
                type="text"
                onChange={props.handleInputChange}
                placeholder="Enter Bot Name Here"
                className={''}
              />
              < span > Type: </span>
            </label>

            < select
              name="botType"
              id="botType"
              onChange={props.handleInputChange}
              value={props.botType}
              className={''}
            >
              <option value="Unipedal" > Unipedal </option>
              < option value="Bipedal" > Bipedal </option>
              < option value="Quadrupedal" > Quadrupedal </option>
              < option value="Arachnid" > Arachnid </option>
              < option value="Radial" > Radial </option>
              < option value="Aeronautical" > Aeronautical </option>
            </select>

            < button type="submit" >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  )
}
