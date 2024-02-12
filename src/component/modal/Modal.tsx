import React from 'react'
import {CloseOutline} from "react-ionicons";

export default function ({
 className = '',
 onClose = () => {},
 children = null,
}) {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-30 z-10"/>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-end z-20">
        <div className={`bg-white p-4 rounded-t-2xl ${className}`}>
          <CloseOutline height="2rem" width="2rem" color="rgb(var(--purple))" cssClasses="absolute cursor-pointer" onClick={onClose} />
          {children}
        </div>
      </div>
    </>
  )
}