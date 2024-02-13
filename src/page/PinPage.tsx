import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import PrimaryButton from "../component/PrimaryButton";
import Subtitle from "../component/Subtitle";
import {Link} from "react-router-dom";
import linkedKeypadAndPINDisplay from "../component/linkedKeypadAndPINDisplay";

export default function () {
  const {PINDisplay, Keypad, state} = linkedKeypadAndPINDisplay()

  return (
    <div className="dp-enter-pin flex flex-col flex-grow flex-start">
      <header className="flex items-center">
        <BackButton/>
        <Subtitle>Secure your account</Subtitle>
      </header>
      <div className="explanation">
        <div className="flex flex-col items-center">
          <Subtitle className="mt-6">Your new PIN</Subtitle>
          <Text type="text-3" className="text-center text-dp-gray mt-2 w-48">Choose a 4 - 6 digit pin to secure your account</Text>
        </div>
      </div>
      <PINDisplay className="w-full mt-10 mb-8"/>
      <Keypad className="mt-auto flex-grow py-6"/>
      <Link to="/fingerprint" className="w-full">
        <PrimaryButton disabled={state.pin.length < 4} className="w-full">Confirm</PrimaryButton>
      </Link>
    </div>
  )
}