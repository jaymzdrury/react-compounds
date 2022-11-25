import {ReactElement, useState, Children, cloneElement} from 'react'

function CloneElement() {

  const Checkbox = ({children}:{children: ReactElement[]}) => {
    const [checked, checkedSet] = useState<boolean | null>(true)
    return (
      <div>
        {Children.map(children, (child) => {
          return cloneElement(child, {
            checked,
            checkedSet
          })
        })}
      </div>
    )
  }

  const CheckboxLabel = ({checked}:{checked?: boolean}) => {
    if(checked === undefined || checked == null) throw new Error('Label not getting props') 
    return <label>{checked ? 'ON': 'OFF'}</label>
  }
  
  const CheckboxInput = ({checked, checkedSet}:{checked?: boolean, checkedSet?: (value: boolean) => void}) => {
    if(!checkedSet) throw new Error('Input not getting props')
    return <input type='checkbox' checked={checked} onChange={e => checkedSet(e.target.checked)} />
  }

  return (
    <Checkbox>
        <CheckboxLabel />
        <CheckboxInput />
    </Checkbox>
  )
}

export default CloneElement