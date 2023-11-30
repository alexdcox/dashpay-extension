import React, {DOMElement, useEffect, useRef} from "react";
import {SearchOutline} from "react-ionicons";

export default function(props: any) {
  const {placeholder = 'Search'} = props
  const inputRef = useRef<HTMLInputElement>()
  useEffect(() => {
    if(props.autoFocus) {
      inputRef?.current?.focus()
    }
  }, []);
  return (
    <div {...{
      className: `${props.className} w-full group relative`,
    }}>
      <input ref={inputRef} type="text" onKeyDown={props?.onKeyDown} onChange={props.onChange} value={props.value || ''} placeholder={placeholder} type={props.type || 'text'} className="
      bg-gray-100 w-full text-base outline-0 border p-2 pl-3 rounded-xl flex items-center
      focus:bg-dp-bg-purple-light focus:border-dp-text-purple"/>
    </div>

    // <div className={props.className}>
    //   <span className="text-dp-text-gray text-sm font-light">{props.label}</span>
    //   <input type="text" placeholder={props.placeholder} className="outline-0 w-full border border border-gray-200 p-2 pl-3 mt-1 text-base rounded rounded-lg bg-gray-100 font-light"/>
    // </div>
  )
}