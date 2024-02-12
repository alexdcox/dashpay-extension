import React from 'react'

export default function({
  onClick = undefined,
  className = '',
}) {
  return (
    <div {...{
      onClick,
      className: `flex w-[3rem] -mr-2 h-[3rem] ml-auto justify-center cursor-pointer ${className}`,
    }}>
        <div className="flex flex-col justify-between my-[0.8rem]">
          {[...Array(3)].map((_, k) => (
            <div key={k} className="w-[0.3rem] h-[0.3rem] mr-[2px] bg-dp-purple rounded-full"/>
          ))}
        </div>
    </div>
  )
}

