import Keypad from "./Keypad";
import {useState} from "react";
import PINDisplay from "./PINDisplay";

export default function ({
  maxDigits = 6,
  onChange = undefined as (pin: string) => void,
} = {}) {
  const [pin, setPIN] = useState('')

  const onKeyPress = (value: any) => {
    if (value == '.') return
    if (pin.length >= maxDigits) return
    setPIN(pin + value)
    onChange?.(pin)
  }

  const onBackspace = () => {
    setPIN(pin.substring(0, pin.length - 1))
    onChange?.(pin)
  }

  return {
    pin,
    setPIN,
    PINDisplay: ({className = ''}) => <PINDisplay {...{className, pin}}/>,
    Keypad: (props: any) => <Keypad {...{onBackspace, onKeyPress, ...props}}/>,
  }
}