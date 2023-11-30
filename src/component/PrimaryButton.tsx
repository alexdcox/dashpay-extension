import React from 'react'

export default function(props: any) {
  return (
    <button {...props} className={props.className + " dp-button text-center text-sm p-3 rounded-lg text-md select-none " +
      "bg-gradient-to-tr from-[#627BFF] to-[#8D71FF] text-white enabled:cursor-pointer " +
      "disabled:opacity-30 "}>
      {props.children}
    </button>
  )
}

