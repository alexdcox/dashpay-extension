import Keypad from "./Keypad";
import AmountDisplay from "./AmountDisplay";
import { useState } from "react";
import useChangeCurrencyModal from "./modal/useChangeCurrencyModal";

export default function() {
  const [amountDisplay, setAmountDisplay] = useState('0')

  const [state, setState] = useState({
    cryptoAmount: 0,
    cryptoCurrency: 'DASH',
    fiatAmount: 0,
    fiatCurrency: 'USD',
    target: 'crypto',
  })

  const onKeyPress = (key: number) => {
    const amountDisplayValue = (amountDisplay + key)
      .replace(/^0(?=.)/, '')          // remove leading 0s
      .replace(/(?<=\.\d{8}).*/, '')   // limit to 8 D.P
      .replace(/(?<=.{10}).*/, '')     // limit to 10 chars
      .replace(/(?<=.{10})\./, '')     // prevent last char period "."
      .replace(/(?<=\.+)\./, '')       // prevent multiple periods ".."
      .replace(/^\./, '0.')            // automatically prepend 0

    console.log(key, amountDisplayValue)
    setAmountDisplay(amountDisplayValue)
    setState({...state, [`${primary}Amount`]: Number(amountDisplayValue)})
  }

  const onBackspace = () => {
    const amountDisplayValue = amountDisplay.slice(0, -1)
    setAmountDisplay(amountDisplayValue)
    setState({...state, [`${primary}Amount`]: Number(amountDisplayValue)})
  }

  const oppositeTarget = () => state.target === 'crypto' ? 'fiat' : 'crypto'
  const primary = state.target
  const secondary = oppositeTarget()

  const onClickSwitch = () => {
    setState({
      ...state,
      target: oppositeTarget(),
      [`${state.target}Amount`]: Number(amountDisplay),
    })
    setAmountDisplay(String(state[`${secondary}Amount`]))
  }

  const changeCurrencyModal = useChangeCurrencyModal({
    currency: state[`${secondary}Currency`],
    onChange: fiatCurrency => {
      setState({...state, fiatCurrency: fiatCurrency.code})
      changeCurrencyModal.setOpen(false)
    }
  })

  const onClickCurrencySelect = () => changeCurrencyModal.setOpen(true)

  return {
    state,
    setState,
    CurrencyModal: () => changeCurrencyModal.component,
    Keypad: (props: any) => <Keypad {...{
      onBackspace,
      onKeyPress,
      ...props,
    }}/>,
    AmountDisplay: ( {
      className = undefined,
      onClickEdit = undefined,
      showEdit = undefined,
      showSwitch = undefined,
      showCurrencySelect = state[`${secondary}Currency`] != 'DASH',
      primaryAmount = amountDisplay,
      primaryCurrency = state[`${primary}Currency`],
      secondaryAmount = state[`${secondary}Amount`],
      secondaryCurrency = state[`${secondary}Currency`],
    }) => <AmountDisplay {...{
      className,
      onClickEdit,
      onClickSwitch,
      onClickCurrencySelect,
      showEdit,
      showSwitch,
      showCurrencySelect,
      primaryAmount,
      primaryCurrency,
      secondaryAmount,
      secondaryCurrency,
    }}/>
  }
}