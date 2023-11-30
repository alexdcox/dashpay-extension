/// <reference types="vite-plugin-svgr/client" />
import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Button from "../component/PrimaryButton";
import Text from "../component/Text";
import {debugMenu} from "../util";
import Suggestions from "../component/Suggestions";

export default function (props: any) {
  const [state, setState] = useState({
    words: [],
    suggestions: ['Moltres', 'Zapdos', 'Articuno']
  })

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex items-center mb-4">
        <BackButton onClick={debugMenu()}/>
        <Text type="title-4">Add an existing wallet</Text>
      </header>
      <Text type="title-4">Enter your seed phrase</Text>
      <Text type="text-3" className="text-dp-text-gray mt-3">
        Please enter your seed phrase to import your existing wallet.
      </Text>

      {/* BLURRED */}
      <section className="input w-full">
        <div className="mt-3 bg-gray-100 text-base p-2 rounded-xl flex blur-[0.16rem] border border-gray-300 scale-90 m-auto">
          <div className="bg-dp-bg-purple-light rounded-full w-[1.4rem] h-[1.4rem] text-[0.7rem] font-bold flex items-center justify-center border p-1 flex-shrink-0 flex-grow-0 bg-white text-dp-text-purple border-[var(--Purple-bg)]">1</div>
          <input type="text" value="Kitten" className="bg-transparent ml-2 !outline-none"/>
        </div>
      </section>

      {/* GOOD */}
      <section className="input w-full">
        <div className="mt-3 bg-gray-100 w-full text-base p-2 rounded-xl flex border border-[var(--Purple-bg)]">
          <div className="bg-dp-bg-purple-light rounded-full w-[1.4rem] h-[1.4rem] text-[0.7rem] font-bold  flex items-center justify-center border p-1 flex-shrink-0 flex-grow-0 bg-white text-dp-text-purple border-[var(--Purple-bg)]">1</div>
          <input type="text" placeholder="Keyword" className="bg-transparent ml-2 !outline-none"/>
        </div>
      </section>

      {/* BAD */}
      <section className="input w-full">
        <div className="mt-3 bg-dp-bg-red w-full text-base p-2 rounded-xl flex border border-[var(--Red-validation-text)]">
          <div className="text-dp-text-red rounded-full w-[1.4rem] h-[1.4rem] text-[0.7rem] font-bold flex items-center justify-center border p-1 flex-shrink-0 flex-grow-0 bg-white border-[var(--Red-validation-text)]">2</div>
          <input type="text" placeholder="Keyword" className="bg-transparent ml-2 !outline-none"/>
        </div>
      </section>
      <span className="font-light mt-1 text-dp-text-red">Invalid word</span>

      <Suggestions options={state.suggestions}/>
      <Button className="w-full">Next</Button>
    </div>
  )
}