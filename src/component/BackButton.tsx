import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";

export default function ({
  onClick = undefined as (defaultOnClick: () => void) => void,
  className = '',
  debug = false,
  redirect = undefined,
}) {
  const {state} = useLocation()
  const nav = useNavigate()
  const defaultOnClick = () => {
    if (debug) {
      return nav('/debug')
    }
    if (redirect) {
      return nav(redirect)
    }
    nav(-1)
  }
  const handleOnClick = () => {
    if (onClick) {
      onClick(defaultOnClick)
    } else {
      defaultOnClick()
    }
  }
  return !state?.disableBack && (
    <div onClick={handleOnClick}
         className={`cursor-pointer w-10 h-10 flex justify-start items-center mr-2 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M13.3438 21.875L5.46875 14L13.3438 6.125M6.5625 14H22.5312" stroke="#6C69FC" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}