import React, {useEffect, useRef} from 'react'
import Text from "../Text";

export default function({
  onClose = () => {},
  className = '',
  options = [],
}) {
  const contextMenuRef: any = useRef(null)
  const handleClickOutside = (event: Event) => {
    if (contextMenuRef) {
      if (!contextMenuRef?.current?.contains(event.target)) {
        onClose()
      }
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);
  return (
    <div {...{
      ref: contextMenuRef,
      className: `fixed top-2 right-2 bg-white z-10 shadow rounded-lg border border-gray-200 p-4 ${className}`,
    }}>
      {options.map((option: any, k: number) => {
        const bg = option.iconBackgroundColor || 'bg-dp-purple/10'
        return (
          <div key={k} className="flex first:mt-0 mt-3 items-center cursor-pointer" onClick={option.onClick}>
            <div className={`rounded-full ${bg} w-[1.75rem] h-[1.75rem] flex items-center justify-center`}>
              {option.icon}
            </div>
            <Text type="text-1" className="ml-3">
              {option.text}
            </Text>
          </div>
        )
      })}
    </div>

  )
}

