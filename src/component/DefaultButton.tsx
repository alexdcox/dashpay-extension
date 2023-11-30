import React from 'react'

export default function(props: any) {
  const className = props.className || ''
  return (
    <div {...props} className={className + " rounded-lg bg-dp-bg-gray text-center py-1 cursor-pointer select-none px-3"}>
      {props.children}
    </div>
  )
}

