import React from 'react'
import {SearchOutline} from "react-ionicons";

export default function (props: any) {
  const {placeholder = 'Search'} = props
  return (
    <div {...{
      className: `${props.className} w-full group relative`,
    }}>
      <SearchOutline height="1.2rem" width="1.2rem" color="var(--Gray-text)" className="absolute top-[11px] left-2"/>
      <input type="text" placeholder={placeholder} className="
      bg-gray-100 w-full text-base outline-0 border border-transparent p-2 pl-8 rounded-xl flex items-center
      focus:bg-dp-bg-purple-light focus:border-dp-text-purple"/>
    </div>
  )
}

