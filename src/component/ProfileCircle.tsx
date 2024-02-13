import React from 'react'

export default function ({
  variant = undefined as string,
  user = undefined,
  size = undefined as string,
  children = undefined,
  className = '' as string,
  style = {} as any,
}) {
  // Profile display priority:
  // . Override Children
  // . Image
  // . Chosen/Derived Color
  // . Default Primary Background

  let variantClasses = ''

  // if (props.user?.profileImage) {
  // }

  if (user?.profileColor) {
    // variantClasses = `bg-[${}]`
    style.background = user.profileColor
  }

  if (!variant && !user?.profileColor && !className?.match(/bg-/)) {
    variant = 'primary'
  }

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-gradient-to-br from-[#627BFF] to-[#8D71FF]'
  }

  let sizeClasses = ''
  switch (size) {
    case 'xxs':
      sizeClasses = 'w-[30px] h-[30px] text-[0.6rem]'
      break
    case 'xs':
      sizeClasses = 'w-[2.25rem] h-[2.25rem] text-[0.94rem]'
      break
    case 'sm':
      sizeClasses = 'w-[2.5625rem] h-[2.5625rem] text-[0.98rem]'
      break
    // case 'md':
    //   sizeClasses = 'w-[2.9rem] h-[2.9rem] text-[1.1rem]'
    //   break
    case 'lg':
      sizeClasses = 'w-[5rem] h-[5rem] text-[2rem]'
      break
    default:
      sizeClasses = 'w-[3rem] h-[3rem] text-[1.2rem]'
  }

  return (
    <div {...{
      style,
      className: `${variantClasses} ${sizeClasses} select-none rounded-full flex-shrink-0 text-white flex font-bold justify-center items-center overflow-hidden ${className}`,
    }}>
      {children ? children : (
        <>
          {user && (
            <>
              {user.profileImage ?
                <img src={user.profileImage} alt="custom profile image"/> :
                (
                  <>
                    {user.name?.[0].toUpperCase()}
                  </>
                )
              }
            </>
          )}
        </>
      )}
    </div>
  )
}