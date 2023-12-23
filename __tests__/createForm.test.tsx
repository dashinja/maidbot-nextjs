import { describe, test, expect, vitest } from 'vitest'
import { screen, render } from '@testing-library/react'
import { CreateForm, CreateFormProps } from '@components/CreateForm/CreateForm'
import { ChangeStateProp } from '@pages/api/bot'
import { BotInfo } from 'utilities/bots'

describe('Create Form Component', () => {
  const renderSut = ({
    botName = 'Test Bot',
    botType = 'Aeronautical',
    changeState = { text: 'Test Bot Name' },
    semiPermaName = 'SemiPermaName Name',
  }: {
    botName?: string
    botType?: BotInfo['botType']
    changeState?: ChangeStateProp
    semiPermaName?: string
  }) =>
    render(
      CreateForm({
        botName,
        botType,
        onClick: () => vitest.fn(),
        handleInputChange: vitest.fn(),
        changeState,
        currentBot: { botName, botType, semiPermaName },
        setBot: vitest.fn(),
      } as CreateFormProps)
    )

  const PageTitle = () => screen.getByText(/maid - bot home defense systems/i)
  const NameInput = () => screen.getByRole('textbox', { name: 'Name:' })
  const BotTypeSelector = () => screen.getByRole('combobox')
  const SubmitButton = () => screen.getByRole('button')

  test('should render', () => {
    renderSut({})
    expect(PageTitle().tagName).toContain('H1')

    expect(PageTitle()).toHaveTextContent('Maid - Bot Home Defense Systems')
  })

  describe('should show an input, combobox, and submit button', () => {
    test.each([
      { name: 'NameInput', value: NameInput },
      { name: 'BotyTypeSelector', value: BotTypeSelector },
      { name: 'SubmitButton', value: SubmitButton },
    ])('$name should be visible', (item) => {
      renderSut({})
      expect(item.value()).toBeVisible()
      expect(item.value()).toBeDefined()
    })
  })
})
