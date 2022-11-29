import { fireEvent, render, screen } from '@testing-library/react';
import {ReactNode, useContext, useState} from 'react'
import {CheckboxContext} from '../Context'

const CustomProvider = ({children}:{children: ReactNode}) => {
  const [checked, checkedSet] = useState(true)
  return (
    <CheckboxContext.Provider value={{checked, checkedSet}}>
      {children}
    </CheckboxContext.Provider>
  )
}

const CustomLabel = () => {
  const {checked} = useContext(CheckboxContext)
  return <label>{checked ? 'ON': 'OFF'}</label>
}

const CustomInput = () => {
  const {checked, checkedSet} = useContext(CheckboxContext)
  return <input data-testid='checkbox' type='checkbox' checked={checked} onChange={e => checkedSet(e.target.checked)} />
}

test('label recieves context',() => {
  render(<CustomProvider><CustomLabel /></CustomProvider>)
  const text = screen.getByText(/ON/i)
  expect(text).toBeInTheDocument()
})

test('input recieves context', () => {
  const {getByTestId} = render(<CustomProvider><CustomInput /></CustomProvider>)
  const checkbox = getByTestId('checkbox') as HTMLInputElement
  expect(checkbox.checked).toEqual(true)
})

test('input checkbox changes', () => {
  const {getByTestId} = render(<CustomProvider><CustomInput /></CustomProvider>)
  const checkbox = getByTestId('checkbox') as HTMLInputElement
  fireEvent.click(checkbox)
  expect(checkbox.checked).toEqual(false)
})


