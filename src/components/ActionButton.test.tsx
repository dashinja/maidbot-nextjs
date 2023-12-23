import React from 'react'
import { render, screen } from '@testing-library/react'
import ActionButton from './ActionButton'

describe('Action Button', () => {
  it('should render correctly', () => {
    render(
      <ActionButton
        text='test text'
        onClick={jest.fn()}
        disabled={false}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
