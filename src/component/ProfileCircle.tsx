import React from 'react'

export default function(props: any) {
  const {user} = props

  // Profile display priority:
  // . Override Children
  // . Image
  // . Chosen/Derived Color
  // . Default Primary Background

  let variantClasses = ''

  if(typeof props.user?.profileCircle === 'string') {
    if (props.user.profileColor) {
      variantClasses = props.user.profileColor
    } else {
      variantClasses = 'bg-gradient-to-br from-[#627BFF] to-[#8D71FF]'
    }
  }

  switch(props.variant) {
    case 'primary':
      variantClasses = 'bg-gradient-to-br from-[#627BFF] to-[#8D71FF]'
  }

  let sizeClasses = ''
  switch(props.size) {
    case 'xs':
      sizeClasses = 'w-[2.25rem] h-[2.25rem] text-[0.94rem]'
      break
    case 'sm':
      sizeClasses = 'w-[2.5625rem] h-[2.5625rem] text-[0.98rem]'
      break
    case 'lg':
      sizeClasses = 'w-[5rem] h-[5rem] text-[2rem]'
      break
    default:
      sizeClasses = 'w-[3rem] h-[3rem] text-[1.2rem]'
  }
  return (
    <div {...{
      style: props.style, // TODO: check
      className: `${variantClasses} ${sizeClasses} rounded-full flex-shrink-0 text-white flex font-bold justify-center items-center overflow-hidden ${props.className}`,
    }}>
      {props.children ? props.children : (
        <>
        {props.user && (
          <>
            {props.user.profileCircle ? props.user.profileCircle : (
              <>
                {props.user.name?.[0].toUpperCase()}
              </>
            )}
          </>
        )}
        </>
      )}
    </div>
  )
}