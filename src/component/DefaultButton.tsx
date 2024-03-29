import React from 'react'

export default function({
  className = '',
  children = null,
  onClick = undefined as () => void,
}) {
  return (
    <div {...{
      className: `rounded-lg bg-dp-gray-light text-center py-1 cursor-pointer select-none px-3 ${className}`,
      children,
      onClick,
    }}/>
  )
}

