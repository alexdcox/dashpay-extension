import React, {useEffect, useState} from "react";
import useModal from "./useModal";
import Text from "../Text";
import Input from "../Input";
import {Currencies} from "../../currencies";
import {CheckmarkSharp} from "react-ionicons";

export default function ({
  currency,
  onChange = undefined,
}) {
  const [state, setState]: any = useState({
    currency,
    currencies: [],
    search: '',
  })

  useEffect(() => {
    const selections = Object.entries(Currencies)
      .map(([key, value]) => ({
        code: key,
        name: value.name,
      }))
      .sort((a, b) => a.code < b.code ? -1 : 1)
    setState({...state, currencies: selections})
  }, []);

  const onSearchCurrency = e => {
    const search = e.target.value
    const searchRegex = search.toLowerCase().split('').join('.*')
    const filtered = Object.entries(Currencies)
      .map(([key, value]) => ({
        code: key,
        name: value.name,
      }))
      .filter(rate => {
        if (rate === undefined) return false
        const nameMatch = rate.name.toLowerCase().match(searchRegex) !== null
        const codeMatch = rate.code.toLowerCase().match(searchRegex) !== null
        return nameMatch || codeMatch
      })
      .sort((a, b) => {
        if (a.code == search.toUpperCase()) return -1
        return a.code < b.code ? -1 : 1
      })
    setState({...state, search, currencies: filtered})
  }

  // NOTE: Manual word breaks are needed for some currencies in order to align
  //       the currency code with consistent spacing after the last word of the
  //       first line. Without manual intervention the text element width
  //       reaches the max char limit but doesn't shrink after a word break.
  //
  // i.e. Given 'word1 word2 word3' and a max width in css indicated by the
  //      ascii box below:
  //
  //              v---v  Unwanted spacing
  // |-----------------|
  // | word1 word2     | X - is where we would want the currency code to go, but
  // | word3           | if it's aligned next to this element it'll be further
  // |-----------------| right than the last word on the first line.

  const manualWordBreaks = {AED: 3, ANG: 2, BAM: 3, PGK: 3, TTD: 3, XAF: 3, VES: 2}

  const handleOnChange = currency => {
    setState({...state, currency: currency.code})
    onChange?.(currency)
  }

  const modal = useModal({
    className: 'h-full flex',
    children: (
      <div className="flex flex-col flex-grow items-center">
        <div className="flex flex-row justify-center items-center mt-1">
          <Text type="title-4" className="">Select Currency</Text>
        </div>

        <Input value={state.search} className="my-5" onChange={onSearchCurrency}/>

        <div className="flex flex-col w-full flex-grow overflow-y-scroll -mr-6 pr-6 -my-4 py-4 space-y-4">
          {state.currencies.map((c, k) => (
            <div key={k} className="w-full flex cursor-pointer" onClick={() => handleOnChange(c)}>
              <div className="rounded-full w-[25px] h-[25px]">
                <img onError={(e: any) => e.target.style.display = 'none'}
                     src={`/icon/currency/${c.code.toLowerCase()}.svg`}
                     alt={`flag for ${c.code}`}
                     className="w-full h-full object-scale-down"/>
              </div>
              <div className="mt-[2px] flex flex-grow">
                {(() => {
                  if (Object.hasOwn(manualWordBreaks, c.code)) {
                    const b = manualWordBreaks[c.code]
                    return <>
                      <Text type="text-2" className="ml-3 max-w-[60%] relative">
                        {c.name.split(' ').slice(0, b).join(' ')}
                        <Text type="text-2" className="ml-1 absolute inline text-dp-gray">({c.code})</Text>
                        <br/>
                        {c.name.split(' ').slice(b).join(' ')}
                      </Text>

                    </>
                  }
                  return <>
                    <Text type="text-2" className="ml-3 max-w-[60%]">{c.name}</Text>
                    <Text type="text-2" className="ml-1 text-dp-gray">({c.code})</Text>
                  </>
                })()}
                {c.code == state.currency && (
                  <div className="p-[4px] w-[20px] h-[20px] bg-dp-purple rounded-full ml-auto flex-grow-0 flex items-center justify-center">
                    <CheckmarkSharp height=".8rem" width=".8rem" color="white"/>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  })

  return {...modal, state, setState}
}