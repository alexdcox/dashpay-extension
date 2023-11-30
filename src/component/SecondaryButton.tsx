import React from 'react'

export default function(props: any) {
  return (
    <button {...props} className={`dp-button cursor-pointer text-center text-dp-text-purple text-sm font-semibold p-3 rounded-lg text-md bg-dp-bg-gray disabled:bg-slate-200 select-none ${props.className}`}>
      {props.children}
    </button>
  )
}

