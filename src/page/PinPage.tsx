import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import PrimaryButton from "../component/PrimaryButton";
import Subtitle from "../component/Subtitle";
import {Link, useLocation, useNavigate, useNavigation} from "react-router-dom";
import linkedKeypadAndPINDisplay from "../component/linkedKeypadAndPINDisplay";

export default function () {
  const {PINDisplay, Keypad, pin, setPIN} = linkedKeypadAndPINDisplay()
  const Views = {
    Enter: 0,
    Confirm: 1,
  }
  const [view, setView] = useState(Views.Enter)
  const [firstEntry, setFirstEntry] = useState('')
  const nav = useNavigate()
  const location =  useLocation()
  const pinValid = () => {
    switch (view) {
      case Views.Enter:
        return pin.length >= 4 && pin.length <= 6
      case Views.Confirm:
        return pin === firstEntry
    }
  }
  const onButtonClick = () => {
    if (!pinValid()) return
    switch (view) {
      case Views.Enter:
        setPIN('')
        setFirstEntry(pin)
        setView(Views.Confirm)
        break
      case Views.Confirm:
        nav(location?.state?.redirect || '/fingerprint')
        break
    }
  }
  const onClickBack = (d) => {
    switch (view) {
      case Views.Enter:
        d()
        break
      case Views.Confirm:
        setPIN('')
        setFirstEntry('')
        setView(Views.Enter)
    }
  }
  return (
    <div className="dp-enter-pin flex flex-col flex-grow flex-start">
      <header className="flex items-center">
        <BackButton onClick={onClickBack}/>
        <Subtitle>Secure your account</Subtitle>
      </header>
      <div className="explanation">
        <div className="flex flex-col items-center">
          <Subtitle className="mt-6">
            {view === Views.Enter ? 'Your new PIN' : 'Confirm your PIN'}
          </Subtitle>
          <Text type="text-3" className="text-center text-dp-gray mt-2 w-48">
            {view === Views.Enter ?
              'Choose a 4 - 6 digit pin to secure your account' :
              'Please enter your PIN again for confirmation'}
          </Text>
        </div>
      </div>
      <PINDisplay className="w-full mt-10 mb-8"/>
      <Keypad className="mt-auto flex-grow py-6"/>
      <PrimaryButton disabled={!pinValid()} className="w-full" onClick={onButtonClick}>Confirm</PrimaryButton>
    </div>
  )
}