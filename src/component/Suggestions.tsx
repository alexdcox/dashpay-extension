import React from 'react'
import DefaultButton from "./DefaultButton";

export default function ({
  className = '',
  options = [],
}) {
  return (
    <div {...{
      className: `name-suggestions mt-auto w-full ${className}`,
    }}>
      <div className="flex flex-grow space-x-2 mb-4">
        {options.map((suggestion:string, k:number) => (
          <DefaultButton key={k}>{suggestion}</DefaultButton>
        ))}
      </div>
    </div>
  )
}