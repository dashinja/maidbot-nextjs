import React from 'react'

export default function ScoreBanner(
  props: any
) {
  return (
    <div>
      <p>
        {props.title}:{' '}
        <span
          className={props.className}
        >
          <em>
            <strong>
              {props.name}
            </strong>
          </em>{' '}
          with {props.value} tasks
          completed!
        </span>
      </p>
    </div>
  )
}
