import React from 'react'

export default function (props: any) {
  const {entries = []} = props
  const classes = {
    lg: {
      item: 'mb-6',
      spacer: '-mb-3',
    },
    sm: {
      item: 'mb-4',
      spacer: '-mb-2',
    },
    xs: {
      item: 'mb-3',
      spacer: '-mb-1.5',
    },
  }
  const size = props.size || 'sm'
  return (
    <div {...{
      className: props.className + " ",
    }}>
      {entries.map((entry: any, index: number) => (
        <div key={index} className={`relative flex items-center cursor-pointer flex-grow ${classes[size].item}`}>
          {props?.iconContent?.(entry)}
          <div className="flex flex-col ml-3 overflow-hidden w-full" onClick={() => props?.onSelect?.(entry)}>
            <div className="flex flex-row items-center w-full">
              <div className="flex flex-col flex-grow overflow-hidden">
                {props.mainContent && props.mainContent(entry)}
              </div>
              {props.rightContent && props.rightContent(entry)}
            </div>
            {(
              <div className={`spacer h-[1px] w-full absolute bottom-0 ${classes[size].spacer} bg-slate-200`}></div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

