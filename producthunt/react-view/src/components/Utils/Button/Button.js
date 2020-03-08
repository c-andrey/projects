import React from 'react'

import './styles.css'

export default function Button(props) {
  return (
    <div className="button-c">
      <button type={props.type} disabled={props.disabled} onClick={props.action}>{props.value}</button>
    </div>
  )
}
