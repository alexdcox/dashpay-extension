import React from 'react'

export default function ({
  onSelect = undefined,
  iconContent = undefined,
  mainContent = undefined,
  rightContent = undefined,
  entries = [],
  className = '',
  size = 'sm',
}) {
  const classes = {
    lg: {
      // item: 'mb-6',
      spacer: 'my-3',
    },
    sm: {
      // item: 'mb-4',
      spacer: 'my-2',
    },
    xs: {
      // item: 'mb-3',
      spacer: 'my-1.5',
    },
  }
  return (
    <div className={`w-full ${className}`}>
      {entries.map((entry: any, index: number) => (
        <div key={index}
             className={`flex items-center cursor-pointer flex-grow ${index < entries.length - 1 ? classes[size].item : ''}`}>
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              {iconContent?.(entry)}
              <div className=" flex flex-row ml-3 overflow-hidden w-full items-center justify-center"
                   onClick={() => onSelect?.(entry)}>
                <div className="flex flex-col flex-grow overflow-hidden">
                  {mainContent && mainContent(entry)}
                </div>
                {rightContent && rightContent(entry)}
              </div>
            </div>
            {index < entries.length - 1 && (
              <div className="flex flex-row -mr-6">
                <div className="w-[3rem]"></div>
                <div className={`spacer h-[1px] w-full ml-3 ${classes[size].spacer} bg-slate-200`}></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

