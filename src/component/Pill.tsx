import React from 'react'
import SentIcon from "../asset/icon/sent.svg?react";
import ReceivedIcon from "../asset/icon/received.svg?react";
import DashIcon from "../asset/icon/dash.svg?react";

export default function ({
  variant,
  className = '',
  amount = undefined,
  children = undefined,
}) {
  let variantClasses = ''
  let version = 'default'
  let icon = null
  let smallIconFill = 'rgb(var(--gray))'

  const ifmatch = (match: RegExp, cb?: any) => {
    if (cb && variant.match(match) !== null) {
      cb()
    }
  }

  ifmatch(/primary.*/, () => {
    variantClasses += ` bg-dp-purple text-white`
    smallIconFill = 'fill-white'
  })
  ifmatch(/green-light.*/, () => {
    variantClasses += ` bg-dp-green/10 text-dp-green`
    smallIconFill = 'fill-dp-green'
  })
  ifmatch(/green-dark.*/, () => {
    variantClasses += ` bg-dp-green`
    smallIconFill = 'fill-white'
  })
  ifmatch(/received.*/, () => {
    variantClasses += ` bg-dp-green/10 text-dp-green`
    icon = <ReceivedIcon className="inline stroke-dp-green"/>
    smallIconFill = 'fill-dp-green'
  })
  ifmatch(/requested.*/, () => {
    variantClasses += ` border border-dp-gray text-dp-gray-dark`
    smallIconFill = 'fill-dp-gray'
  })
  ifmatch(/message.*/, () => {
    variantClasses += ` bg-dp-gray-light`
    smallIconFill = 'fill-dp-gray'
  })
  ifmatch(/white.*/, () => {
    variantClasses += ` bg-white`
    smallIconFill = 'fill-dp-gray'
  })
  ifmatch(/grey.*/, () => {
    variantClasses += ` bg-dp-gray-light`
    smallIconFill = 'fill-black'
  })
  ifmatch(/sent.*/, () => {
    variantClasses += ` bg-blue-50 text-dp-purple`
    icon = <SentIcon className="inline stroke-dp-purple"/>
    smallIconFill = 'fill-dp-purple'
  })
  ifmatch(/purple.*/, () => {
    variantClasses += ` bg-blue-50 text-dp-purple`
    smallIconFill = 'fill-dp-purple'
  })
  ifmatch(/-small/, () => {
    version = 'icon'
    icon = <DashIcon className={`w-[0.8rem] ${smallIconFill}`}/>
  })

  switch (version) {
    case 'icon':
      variantClasses += ` w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center flex-shrink-0`
      break
    case 'long':
    default:
      variantClasses += ` rounded-full py-1 px-2`
      break
  }

  return (
    <div {...{
      className: `${variantClasses} inline-block text-xs ${className}`,
    }}>
      {amount ? `${amount} Dash ` : children}
      {icon}
    </div>
  )
}