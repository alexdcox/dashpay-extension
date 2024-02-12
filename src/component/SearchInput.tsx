import React from 'react'
import {SearchOutline} from "react-ionicons";
import Input from "./Input";

export default function ({
  value,
  onChange,
  placeholder = 'Search',
  className = '',
  inputClassName = '',
}) {
  return (
    <Input {...{
      value,
      onChange,
      placeholder,
      className,
      inputClassName: `pl-8 ${inputClassName}`,
      pre: (
        <SearchOutline height="1.2rem" width="1.2rem" color="rgb(var(--gray))" cssClasses="absolute top-[11px] left-2"/>
      )
    }}/>
  )
}

