import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import PrimaryButton from "../component/PrimaryButton";
import Subtitle from "../component/Subtitle";
import {Link} from "react-router-dom";
import Keypad from "../component/Keypad";

export default function () {
  const [state, setState] = useState({pin: ''})
  const minDigits = 4
  const maxDigits = 6
  const enteredDigits = state.pin.length

  const indiBg = (index: number) => (enteredDigits - 1) >= index ? 'bg-dp-purple' : 'bg-slate-200'

  const onKeyPress = (value: any) => {
    if (value == '.') return
    if (enteredDigits >= maxDigits) return
    const pin = state.pin + value
    setState({...state, pin})
  }

  const onBackspace = () => {
    const pin = state.pin.substring(0, state.pin.length - 1)
    setState({...state, pin})
  }

  return (
    <div className="dp-enter-pin flex flex-col flex-grow flex-start">
      <header className="flex items-center">
        <BackButton/>
        <Subtitle>Secure your account</Subtitle>
      </header>
      <div className="explanation">
        <div className="flex flex-col items-center">
          <Subtitle className="mt-6">Your new PIN</Subtitle>
          <Text type="text-3" className="text-center text-dp-gray mt-2 w-48">Choose a {minDigits} - {maxDigits} digit pin to secure your account</Text>
        </div>
      </div>
      <div className="digit-indicators">
        <div className="flex mt-12 w-1/2 mx-auto justify-between">
          {[...Array(Math.max(4, enteredDigits))].map((_, k) => (
            <div key={k} className={`w-3 h-3 rounded-full ${indiBg(k)}`}></div>
          ))}
        </div>
      </div>
      <Keypad className="mt-auto mb-6" {...{onKeyPress, onBackspace}}/>
      <Link to="/fingerprint" className="w-full">
        <PrimaryButton disabled={state.pin.length < minDigits} className="w-full">Confirm</PrimaryButton>
      </Link>
    </div>
  )
}