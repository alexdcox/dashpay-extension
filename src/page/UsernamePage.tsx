import React, {useMemo, useState} from 'react'
import usernameSvg from '../asset/image/username.svg'
import BackButton from "../component/BackButton";
import Input from "../component/Input";
import Button from "../component/PrimaryButton";
import Suggestions from "../component/Suggestions";
import {Link} from "react-router-dom";
import {Ban, CheckmarkSharp} from "react-ionicons";
import LoadingIndicator from "../component/icon/LoadingIndicator";
import {debounce} from "../util";
import {isButtonElement} from "react-router-dom/dist/dom";

let staticValidation: any = {}
let staticUsername: string = ''

export default function() {
  const ValidationState = {
    Default: 0,
    Loading: 1,
    Success: 2,
    Error: 3,
  }

  const defaultValidationState = {
    length: ValidationState.Error,
    characters: ValidationState.Success,
    availability: ValidationState.Default,
  }

  const [state, setState] = useState({
    suggestions: [],
    username: '',
    validation: defaultValidationState,
  })

  const UsernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]+$/
  const lengthValidator = username => username.length >= 3 && username.length <= 62
  const characterValidator = username => username.match(UsernameRegex) != null
  const usernameValid = username => lengthValidator(username) && characterValidator(username)

  const sendDpnsRequest = useMemo(() => {
    return debounce(async username => {
      if (!usernameValid(username)) return
      console.log("Sending DPNS name check for", username);
      setState({...state, validation: {...staticValidation, availability: ValidationState.Loading}, username})

      // TODO: connect this up to the actual dash client

      // const client = await Dash.client()
      // const dpnsDoc = await client.platform.names.resolve(`${formName.value}.dash`);
      // console.log("Check dpns result (null means available): ", dpnsDoc);
      // if (dpnsDoc === null) {
      //   store.commit("setWishName", formName.value);
      //   nameConstraints.isAvailable = true;
      //   nameConstraintIcons.isAvailable = checkmarkOutline;
      // } else {
      //   nameConstraints.isAvailable = false;
      //   nameConstraintIcons.isAvailable = banOutline;
      // }
      // isCheckingName.value = false;

      setTimeout(() => {
        if (username != staticUsername) {
          return
        }
        setState({...state, validation: {...staticValidation, availability: ValidationState.Success}, username})
      }, 2000)
    }, 1000)
  }, [])

  const validatorMessages = {
    length: () => state.username.length > 62 ? 'Maximum 62 characters' : 'Minimum 3 characters',
    characters: () => 'Letters, numbers and hyphens only',
    availability: () => {
      switch (state.validation.availability) {
        case ValidationState.Error:
          return 'Username is already taken'
        case ValidationState.Loading:
          return 'Checking username'
        default:
          return 'Username available'
      }
    }
  }

  const onChangeUsername = async (e: any) => {
    const username = e.target.value
    let validation = defaultValidationState
    if (username.length > 0) {
      validation.length = lengthValidator(username) ? ValidationState.Success : ValidationState.Error
      validation.characters = characterValidator(username) ? ValidationState.Success : ValidationState.Error
    }
    setState({...state, username, validation})
    staticValidation = validation
    staticUsername = username
    sendDpnsRequest(username)
  }

  const isButtonEnabled = Object.values(state.validation).every(v => v === ValidationState.Success)

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <BackButton className="absolute" debug={true}/>
      <img src={usernameSvg}
           alt="woman sitting with a pen and notepad"
           className="mx-auto w-3/4"/>
      <Input className="mt-6" placeholder="Username" label="Choose your Dash username" value={state.username}
             onChange={onChangeUsername}/>

      <div className="dp-validation mt-4">
        {['length', 'characters', 'availability'].map((validator, k) => {
          switch (state.validation[validator]) {
            case ValidationState.Default:
              return (
                <div className="mt-1 flex items-center h-[23px]" key={k}>
                  <div className="w-[22px]">
                    <LoadingIndicator variant="dot" loading={false} className="ml-[6px] mr-[3px]"/>
                  </div>
                  <span className="text-dp-grey font-light ml-2">{validatorMessages[validator]()}</span>
                </div>
              )
            case ValidationState.Loading:
              return (
                <div className="mt-1 flex items-center h-[23px]" key={k}>
                  <div className="w-[22px]">
                    <LoadingIndicator variant="dot" loading={true} className="ml-[6px] mr-[3px]"/>
                  </div>
                  <span className="text-dp-grey font-light ml-2">{validatorMessages[validator]()}</span>
                </div>
              )
            case ValidationState.Success:
              return (
                <div className="mt-1 flex items-center h-[23px]" key={k}>
                  <div className="w-[22px]">
                    <div className="h-[20px] w-[20px] bg-dp-green/10 rounded-full flex items-center justify-center">
                      <CheckmarkSharp height=".9rem" width=".8rem" color="rgb(var(--green))"/>
                    </div>
                  </div>
                  <span className="text-dp-grey font-light ml-2 text-dp-green">{validatorMessages[validator]()}</span>
                </div>
              )
            case ValidationState.Error:
              return (
                <div className="mt-1 flex items-center h-[23px]" key={k}>
                  <div className="w-[22px]">
                    <div className="h-[20px] w-[20px] bg-dp-red/10 rounded-full flex items-center justify-center">
                      {/*<Ban stroke="hsl(349, 100%, 69%)" className="scale-[1.3]"/>*/}
                      <Ban height=".9rem" width=".8rem" color="rgb(var(--red))"/>
                    </div>
                  </div>
                  <span className="text-dp-grey font-light ml-2 text-dp-red">{validatorMessages[validator]()}</span>
                </div>
              )
          }
        })}
      </div>
      <Suggestions options={state.suggestions} className="mb-4"/>
      <Link to="/backup" className="w-full">
        <Button className="w-full" disabled={!isButtonEnabled}>Next</Button>
      </Link>
    </div>
  )
}