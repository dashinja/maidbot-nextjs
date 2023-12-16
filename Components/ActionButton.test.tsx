import React from 'react'
import ActionButton from './ActionButton'
import {screen, render} from '@testing-library/react'

describe('Action Button', () => {
  it('should render correctly', () => {
   render(<ActionButton text='test text' onClick={jest.fn()} disabled={false}/>)

   const button = screen.getByRole('button')
   expect(button).toBeInTheDocument()
  })
})

