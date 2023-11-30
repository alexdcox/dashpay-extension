import React from 'react'
import {CloseOutline} from "react-ionicons";

export default function (props: any) {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-30"/>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-end">
        <div className="bg-white p-4 rounded-t-2xl">
          <CloseOutline height="2rem" width="2rem" color="var(--Purple-text)" cssClasses="absolute cursor-pointer" onClick={props.onClose} />
          {props.children}
        </div>
      </div>
    </>
  )
}