import React from 'react'

export default function Banner(props: any) {
  return (
    <div>
      <p>
        {props.title}: <span>{props.value}</span>
      </p>
    </div>
  )
}
