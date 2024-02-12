import React from 'react'
import backspaceSvg from "../asset/icon/backspace.svg";

export default function({
  className = '',
  onKeyPress = (key: number|string) => {},
  onBackspace = () => {},
}) {
  const Key = (props: any) => {
    return (
      <div {...{
        ...props,
        className: `${props.className || ''} flex justify-center p-3 text-xl text-gray-500 cursor-pointer select-none`,
      }}/>
    )
  }
  return (
    <div className={`keypad w-full ${className}`}>
        <div className="grid grid-cols-3">
          {[...Array(9)].map((_, k) => (
            <Key key={k} onClick={() => onKeyPress(k+1)}>{k + 1}</Key>
          ))}
          <Key onClick={() => onKeyPress('.')}>.</Key>
          <Key onClick={() => onKeyPress(0)}>0</Key>
          <Key onClick={onBackspace}>
            <img src={backspaceSvg} alt="backspace icon" className="scale-[0.5]"/>
          </Key>
        </div>
    </div>
  )
}