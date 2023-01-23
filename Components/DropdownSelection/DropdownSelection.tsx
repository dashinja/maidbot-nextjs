import { text } from 'stream/consumers'
import { ChangeStateProp } from '../../pages/api/bot'
import {
  BotStartupProps,
  CreateBotProps,
} from '../../Utils/bots'

export type DropDownSelectionProps =
  Pick<
    CreateBotProps,
    'setBot' | 'currentBot'
  > & {
    changeState: ChangeStateProp
    className?: string
  }

export const DropdownSelection = ({
  currentBot,
  setBot,
  changeState,
  className = '',
}: DropDownSelectionProps) => {
  const handleOnSelection = (e) => {
    const { target } = e
    setBot({
      ...currentBot,
      ...{ botType: target.value },
    })
  }

  return (
    <>
      <span> Type: </span>
      <label htmlFor="botType"></label>
      <select
        name="botType"
        id="botType"
        data-testid="botType-selector"
        onChange={handleOnSelection}
        className={className}
        value={
          changeState?.key ||
          currentBot.botType
        }
      >
        <option value="Unipedal">
          {' '}
          Unipedal{' '}
        </option>
        <option value="Bipedal">
          {' '}
          Bipedal{' '}
        </option>
        <option value="Quadrupedal">
          {' '}
          Quadrupedal{' '}
        </option>
        <option value="Arachnid">
          {' '}
          Arachnid{' '}
        </option>
        <option value="Radial">
          {' '}
          Radial{' '}
        </option>
        <option value="Aeronautical">
          {' '}
          Aeronautical{' '}
        </option>
      </select>
    </>
  )
}
