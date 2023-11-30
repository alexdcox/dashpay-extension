import React from 'react'
import sentSvg from "../asset/icon/sent.svg";
import receivedSvg from "../asset/icon/received.svg";
import DashIcon from "../asset/icon/dash.svg?react";

export default function (props: any) {
  let variantClasses = ''
  let version = 'default'
  let icon = null
  let smallIconFill = 'var(--Gray-text)'

  const ifmatch = (match: RegExp, cb?: any) => {
    if (cb && props.variant.match(match) !== null) {
      cb()
    }
  }

  ifmatch(/primary/, () => {
    variantClasses += ` bg-dp-bg-purple text-white`
  })
  ifmatch(/received.*/, () => {
    variantClasses += ` bg-dp-bg-green text-dp-text-green`
    icon = <img src={receivedSvg} alt="received icon" className="inline ml-1"/>
    smallIconFill = 'var(--Green-validation-text)'
  })
  ifmatch(/requested.*/, () => {
    variantClasses += ` border border-dp-text-gray text-dp-text-gray`
  })
  ifmatch(/sent.*/, () => {
    variantClasses += ` bg-blue-50 text-dp-text-purple`
    icon = <img src={sentSvg} alt="sent icon" className="inline ml-1"/>
    smallIconFill = 'var(--Purple-text)'
  })
  ifmatch(/-small/, () => {
    version = 'icon'
    icon = <DashIcon fill={smallIconFill} className="w-[0.8rem]"/>
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
      ...props,
      className: `${props.className} ${variantClasses} inline-block ml-1 text-xs`,
    }}>
      {props.amount ? `${props.amount} Dash` : props.children}
      {icon}
    </div>
  )
}