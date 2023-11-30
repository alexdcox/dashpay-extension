import React, {useState} from 'react'
import usernameSvg from '../asset/image/username.svg'
import BackButton from "../component/BackButton";
import Input from "../component/Input";
import Button from "../component/PrimaryButton";
import Suggestions from "../component/Suggestions";
import {debugMenu} from "../util";
import {Link} from "react-router-dom";
import {Ban, CheckmarkSharp} from "react-ionicons";

export default function (props: any) {
  const [state, setState] = useState({
    suggestions: ['Moltres', 'Zapdos', 'Articuno']
  })
  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <BackButton onClick={debugMenu()} className="absolute"/>
      <img src={usernameSvg}
           alt="woman sitting with a pen and notepad"
           className="mx-auto w-3/4"/>
      <Input className="mt-6" placeholder="Username" label="Choose your Dash username"/>

      <div className="dp-validation mt-4">
        <div className="pending">
          <div className="mt-1 flex items-center">
            <div className="flex justify-center items-center ml-[6px] mr-[3px]">
              {[...Array(3)].map((_, k) => (
                <div key={k} className="w-[3px] h-[3px] mr-[2px] bg-slate-400 rounded-full"/>
              ))}
            </div>
            <span className="text-dp-text-grey font-light ml-2">Minimum 3 characters</span>
          </div>
        </div>
        <div className="loading">
          <div className="mt-1 flex items-center">
            <div className="flex justify-center items-center ml-[6px] mr-[3px]">
              <div className={`w-[2px] h-[2px] mr-[2px] bg-dp-bg-purple rounded-full`}/>
              <div className={`w-[3px] h-[3px] mr-[2px] bg-dp-bg-purple rounded-full`}/>
              <div className={`w-[4px] h-[4px] mr-[2px] bg-dp-bg-purple rounded-full`}/>
            </div>
            <span className="text-dp-text-grey font-light ml-2 text-dp-text-purple">Checking the username</span>
          </div>
        </div>
        <div className="valid">
          <div className="mt-1 flex items-center">
            <div className="p-[4px] bg-dp-bg-green rounded-full">
              <CheckmarkSharp height=".9rem" width=".8rem" color="var(--Green-validation-text)" />
            </div>
            <span className="text-dp-text-grey font-light ml-2 text-dp-text-green">Letters, numbers and hyphen only</span>
          </div>
        </div>
        <div className="invalid">
          <div className="mt-1 flex items-center">
            <div className="p-[4px] bg-dp-bg-red rounded-full">
              {/*<Ban stroke="hsl(349, 100%, 69%)" className="scale-[1.3]"/>*/}
              <Ban height=".9rem" width=".8rem" color="var(--Red-validation-text)" />
            </div>
            <span className="text-dp-text-grey font-light ml-2 text-dp-text-red">Username is already taken</span>
          </div>
        </div>
      </div>
      <Suggestions options={state.suggestions}/>
      <Link to="/backup" className="w-full">
        <Button className="w-full">Next</Button>
      </Link>
    </div>
  )
}