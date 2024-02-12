import React from 'react'
import {Scan} from "react-ionicons";
import Input from "./Input";

export default function ({
  value,
  onChange,
  placeholder = 'Address',
  className = '',
  inputClassName = '',
}) {
  return (
    <Input {...{
      value,
      onChange,
      placeholder,
      className,
      inputClassName: `pr-[90px] ${inputClassName}`,
      post: (
        <div className="absolute top-3 right-0 flex flex-row pr-3 space-x-2 items-center ">
          <span className="text-dp-purple text-sm cursor-pointer">Paste</span>
          <Scan height="1.2rem" width="1.2rem" color="rgb(var(--purple))" cssClasses="cursor-pointer"/>
        </div>
      )
    }}/>
  )
}

