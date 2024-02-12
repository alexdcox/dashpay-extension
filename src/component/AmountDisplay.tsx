import Text from "./Text";
import CaretDownIcon from "../asset/icon/caret-down.svg?react";
import {CreateOutline, Sync} from "react-ionicons";

export default function ({
  className = '',
  primaryAmount = 0 as string | number,
  primaryCurrency = 'DASH',
  secondaryAmount = 0 as string | number,
  secondaryCurrency = 'USD',
  showCurrencySelect = true,
  message = '',
  showSwitch = true,
  showEdit = true,
  onClickEdit = () => {},
  onClickCurrencySelect = () => {},
  onClickSwitch = () => {},
  color = 'purple',
}) {
  const v = {
    'purple': {
      switchBackground: 'bg-dp-purple/10',
      switchStroke: 'rgb(var(--purple))',
    },
    'green': {
      switchBackground: 'bg-dp-green/10',
      switchStroke: 'rgb(var(--green))',
    },
  }[color]

  return (
    <div className={`w-full flex items-center align-middle justify-center content-center relative ${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center">
            <Text type="title-1">{String(primaryAmount)?.length < 1 ? 0 : primaryAmount} {primaryCurrency}</Text>
            {showEdit && (
              <CreateOutline cssClasses="ml-2 cursor-pointer" color="rgb(var(--purple))" height="1.3rem" width="1.3rem" onClick={onClickEdit}/>
            )}
          </div>
          <div className="flex items-center">
            <Text type="text-2" className="text-dp-gray">{String(secondaryAmount)?.length < 1 ? 0 : secondaryAmount} {secondaryCurrency}</Text>
            {showCurrencySelect && <CaretDownIcon className="ml-2 cursor-pointer select-none" onClick={onClickCurrencySelect}/>}
          </div>
        </div>
        {message?.length > 0 && (
          <span className="text-dp-gray text-sm mt-2">"{message}"</span>
        )}
      </div>
      {showSwitch && (
        <div
          className={`absolute right-0 flex items-center select-none justify-center shrink-0 rounded-full w-[35px] h-[35px] ${v.switchBackground} cursor-pointer`} onClick={onClickSwitch}>
          <Sync color={v.switchStroke} height="1.3rem" width="1.3rem"/>
        </div>
      )}
    </div>
  )
}