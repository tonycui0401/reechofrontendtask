import React from 'react'

export const CheckBox = props => {
    return (
      <li style={{listStyleType: "none"}}>
       <input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )
}


export default CheckBox