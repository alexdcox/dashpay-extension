import React from 'react'

export default function({
  type,
  children = null,
  className = '',
}) {
  let typeClasses = ''
  let propClasses = className
  switch(type) {
    case 'text-1':
      typeClasses = 'text-base font-normal'
      break
    case 'text-2':
      typeClasses = 'text-sm font-medium'
      break
    case 'text-3':
      typeClasses = 'text-sm font-normal'
      break
    case 'text-4':
      typeClasses = 'text-xs font-medium'
      break
    case 'text-5':
      typeClasses = 'text-xs font-normal'
      break
    case 'text-6':
      typeClasses = 'text-xs font-semibold'
      break
    case 'text-7':
      typeClasses = 'text-[0.6875rem] font-semibold'
      break
    case 'text-8':
      typeClasses = 'text-[0.6875rem] '
      break
    case 'title-1':
      typeClasses = 'text-[1.75rem] font-semibold'
      break
    case 'title-4':
      typeClasses = 'text-base font-semibold'
      break
    case 'title-6':
      typeClasses = 'text-sm font-bold'
      break
    case 'title-6-reg':
      typeClasses = 'text-[0.9375rem] font-bold'
      break
    case 'title-7':
      typeClasses = 'text-sm font-semibold'
      break
    case 'message':
      typeClasses = 'line-height-[1.125rem] text-[0.875rem]'
      break
    case 'event':
      typeClasses = 'line-height-[1.125rem] text-[0.75rem] italic font-medium'
      break
    default:
      typeClasses = 'text-base text-bold text-red-500'
      propClasses = ''
      children = '<Text> has invalid `type` property!'
      break
  }
  return (
    <div {...{
      children,
      className: `${typeClasses} ${propClasses} antialiased`,
    }}/>
  )
}