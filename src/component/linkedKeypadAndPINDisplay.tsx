import Keypad from "./Keypad";
import {useState} from "react";
import PINDisplay from "./PINDisplay";

export default function({
  maxDigits = 6,
  onChange = undefined as (pin: string) => void,
} = {}) {
  const [state, setState] = useState({
    pin: '',
  })

  const onKeyPress = (value: any) => {
    if (value == '.') return
    if (state.pin.length >= maxDigits) return
    const pin = state.pin + value
    setState({...state, pin})
    onChange?.(pin)
  }

  const onBackspace = () => {
    const pin = state.pin.substring(0, state.pin.length - 1)
    setState({...state, pin})
    onChange?.(pin)
  }

  return {
    state,
    setState,
    PINDisplay: ({
      className = '',
      pin = state.pin,
    }) => <PINDisplay {...{
      className,
      pin,
    }}/>,
    Keypad: (props: any) => <Keypad {...{
      onBackspace,
      onKeyPress,
      ...props,
    }}/>,
  }
}