import React from 'react'
import sentSvg from "../asset/icon/sent.svg";
import receivedSvg from "../asset/icon/received.svg";
import DashIcon from "../asset/icon/dash.svg?react";
import DefaultButton from "./DefaultButton";

export default function (props: any) {
  return (
    <div {...{
      ...props,
      className: `${props.className} name-suggestions mt-auto w-full`,
    }}>
      <div className="flex flex-grow space-x-2 mb-4">
        {props.options.map((suggestion:string, k:number) => (
          <DefaultButton key={k}>{suggestion}</DefaultButton>
        ))}
      </div>
    </div>
  )
}