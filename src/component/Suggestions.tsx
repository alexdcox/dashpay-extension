import React from 'react'
import DefaultButton from "./DefaultButton";

export default function ({
  className = '',
  options = [],
  onSelect = undefined as (selection: string) => void
}) {
  return (
    <div {...{
      className: `name-suggestions mt-auto w-full ${className}`,
    }}>
      <div className="flex flex-grow space-x-2 overflow-x-scroll no-scrollbar">
        {options.map((suggestion:string, k:number) => (
          <DefaultButton key={k} onClick={() => onSelect(suggestion)}>{suggestion}</DefaultButton>
        ))}
      </div>
    </div>
  )
}