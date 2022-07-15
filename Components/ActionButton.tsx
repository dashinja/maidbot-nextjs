import React from 'react'


function ActionButton(props: any) {
  return (

    <button
      className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
      type="button"
      // name={props.name}
      onClick={props.onClick}
      disabled={props.disabled}
      color={props.color}
    // variant="contained"
    // size={props.size}
    >
      {props.text}
    </button>
  )
}

export default ActionButton
