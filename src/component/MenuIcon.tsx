import React, {createContext, Ref, useContext, useEffect, useRef} from 'react'
import {debugMenu} from "../util";

export default function(props: any) {
  return (
    <div {...{
      ...props,
      onClick: props.onClick || debugMenu(),

      className: props.className + " flex w-[3rem] -mr-2 h-[3rem] ml-auto justify-center cursor-pointer",
    }}>
        <div className="flex flex-col justify-between my-[0.8rem]">
          {[...Array(3)].map((_, k) => (
            <div key={k} className="w-[0.3rem] h-[0.3rem] mr-[2px] bg-dp-bg-purple rounded-full"/>
          ))}
        </div>
    </div>
  )
}

