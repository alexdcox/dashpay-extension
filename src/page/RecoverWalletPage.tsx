import React, {useEffect, useRef, useState} from 'react'
import BackButton from "../component/BackButton";
import Button from "../component/PrimaryButton";
import Text from "../component/Text";
import Suggestions from "../component/Suggestions";
import {Mnemonic} from "@dashevo/dashcore-lib";

export default function () {
  const [state, setState] = useState({
    language: 'english', // TODO: set from globals
    suggestions: [],
    keywords: [],
    keyword: '',
  })

  const keywordsContainerRef = useRef()

  const ucFirst = s => s.length > 0 ? s?.[0]?.toUpperCase() + s?.slice(1)?.toLowerCase() : ''

  // NOTE: The wallet-lib package doesn't expose `Words` in the typescript
  //       definitions, but it is set in javascript on the Mnemonic prototype
  //       and can be accessed like this - despite potential IDE concerns.
  const words = Mnemonic.Words[state.language.toUpperCase()].map(ucFirst)

  const onChangeKeyword = e => {
    const keyword = e.target.value
    let suggestions = []
    if (keyword.length >= 2) {
      suggestions = words
        .filter(w => w.match(keyword.split('').join('.*')) !== null)
        .filter(w => !state.keywords.includes(w))
        .sort((a, b) => {
          const score = s => {
            for (let i = 0; i < keyword.length; i++) {
              if (s[i] != keyword[i]) {
                return i
              }
            }
            return keyword.length
          }
          const aScore = score(a)
          const bScore = score(b)
          if (aScore != bScore) {
            return aScore > bScore ? -1 : 1
          }
          return a < b ? -1 : 1
        })
    }
    setState({...state, keyword: ucFirst(keyword), suggestions})
  }

  const onSelectKeyword = word => {
    if (state.keywords.length == 16) {
      // TODO: Complete logic...
      return
    }

    let keyword = word
    if (state.suggestions.length == 1) {
      keyword = state.suggestions?.[0]
    }
    setState({
      ...state,
      keywords: [...state.keywords, ucFirst(keyword)],
      keyword: '',
      suggestions: [],
    })
  }

  const isKeywordValid = () => state.keyword == state.suggestions?.[0] || state.suggestions.length == 1
  const isButtonDisabled = () => !(isKeywordValid() || state.keywords.length == 16)

  useEffect(() => {
    keywordsContainerRef.current.scrollTop = keywordsContainerRef.current.scrollHeight
  }, [state.keywords]);

  const onInputKeydown = e => {
    console.log(e.code)

    switch (e.code) {
      case 'Enter':
        if (!isKeywordValid()) return
        onSelectKeyword(state.keyword)
        break
      case 'Backspace':
        if (state.keyword.length != 0) return
        setState({
          ...state,
          keywords: state.keywords.slice(0, -1),
          keyword: '',
          suggestions: [],
        })
    }
  }

  return (
    <div className="flex flex-col h-full flex-start content-start items-start justify-start">
      <header className="flex items-center mb-4">
        <BackButton/>
        <Text type="title-4">Add an existing wallet</Text>
      </header>
      <Text type="title-4">Enter your seed phrase</Text>
      <Text type="text-3" className="text-dp-gray mt-3">
        Please enter your seed phrase to import your existing wallet.
      </Text>

      <div className="flex flex-col w-full h-full overflow-y-scroll" ref={keywordsContainerRef}>
        {state.keywords.map((w, k) => (
          <section className="input w-full" key={k}>
            <div className="mt-3 bg-gray-100 text-base p-2 rounded-xl flex border border-gray-300 scale-90 m-auto blur-[0.16rem]">
              <div
                className="bg-dp-purple/10 rounded-full w-[1.4rem] h-[1.4rem] text-[0.7rem] font-bold flex items-center justify-center border p-1 flex-shrink-0 flex-grow-0 bg-white text-dp-purple border-[rgb(--purple)] select-none">{k + 1}</div>
              <input type="text" value={w} className="bg-transparent ml-2 !outline-none select-none cursor-default"
                     disabled={true}/>
            </div>
          </section>
        ))}

        {state.keywords.length < 16 && (
          <section className="input w-full">
            <div className="mt-3 bg-gray-100 w-full text-base p-2 rounded-xl flex border border-[rgb(var(--purple))]">
              <div
                className="bg-dp-purple/10 rounded-full w-[1.4rem] h-[1.4rem] text-[0.7rem] font-bold  flex items-center justify-center border p-1 flex-shrink-0 flex-grow-0 bg-white text-dp-purple border-[var(--purple)] select-none">{state.keywords.length + 1}</div>
              <input type="text" placeholder="Keyword" className="bg-transparent ml-2 !outline-none"
                     onChange={onChangeKeyword} value={state.keyword} onKeyDown={onInputKeydown}/>
            </div>
          </section>
        )}
      </div>
      <div className="h-[26px] my-4 flex-shrink-0">
        <Suggestions options={state.suggestions} onSelect={onSelectKeyword} className=""/>
      </div>
      <Button className="w-full" disabled={isButtonDisabled()}
              onClick={() => onSelectKeyword(state.keyword)}>Next</Button>
      {/* BAD */}
      {/*
      <section className="input w-full">
        <div className="mt-3 bg-dp-red/10 w-full text-base p-2 rounded-xl flex border border-[rgb(var(--red))]">
          <div className="text-dp-red rounded-full w-[1.4rem] h-[1.4rem] text-[0.7rem] font-bold flex items-center justify-center border p-1 flex-shrink-0 flex-grow-0 bg-white border-[rgb(var(--red))]">2</div>
          <input type="text" placeholder="Keyword" className="bg-transparent ml-2 !outline-none"/>
        </div>
      </section>
      <span className="font-light mt-1 text-dp-red">Invalid word</span>
      */}
    </div>
  )
}