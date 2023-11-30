import React, {useEffect, useRef} from 'react'
import Text from "./Text";

export default function(props: any) {
  const contextMenuRef: any = useRef(null)
  const handleClickOutside = (event: Event) => {
    if (contextMenuRef) {
      if (!contextMenuRef?.current?.contains(event.target)) {
        props?.onClose()
      }
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);
  const {options} = props
  return (
    <div {...{
      ...props,
      ref: contextMenuRef,
      className: `fixed top-2 right-2 bg-white shadow rounded-lg border border-gray-200 p-4 ${props.className}`,
    }}>
      {options.map((option: any, k: number) => (
        <div key={k} className="flex first:mt-0 mt-2 items-center cursor-pointer">
          <div className="rounded-full bg-dp-bg-purple-light w-[1.75rem] h-[1.75rem] flex items-center justify-center">
            {option.icon}
          </div>
          <Text type="text-1" className="ml-3">
            {option.text}
          </Text>
        </div>
      ))}
    </div>

  )
}

