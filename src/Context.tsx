import {Children, createContext, ReactNode, useContext, useState} from 'react'

function Context() {
  const CheckboxContext = createContext({checked: true, checkedSet: (value: boolean) => {}})

  const Checkbox = ({children}:{children: ReactNode}) => {
    const [checked, checkedSet] = useState(true)
    return (
      <div>
        {Children.map(children, (child) => (
          <CheckboxContext.Provider value={{checked, checkedSet}}>
            {child}
          </CheckboxContext.Provider>
        ))}
      </div>
    )
  }

  const CheckboxLabel = () => {
    const {checked} = useContext(CheckboxContext)
    return <label>{checked ? 'ON': 'OFF'}</label>
  }
  
  const CheckboxInput = () => {
    const {checked, checkedSet} = useContext(CheckboxContext)
    return <input type='checkbox' checked={checked} onChange={e => checkedSet(e.target.checked)} />
  }

  return (
    <Checkbox>
        <CheckboxLabel />
        <CheckboxInput />
    </Checkbox>
  )
}

export default Context