import React, {useState} from 'react'
import usernameSvg from '../asset/image/username.svg'
import BackButton from "../component/BackButton";
import Input from "../component/Input";
import Button from "../component/PrimaryButton";
import Suggestions from "../component/Suggestions";
import {Link} from "react-router-dom";
import {Ban, CheckmarkSharp} from "react-ionicons";
import LoadingIndicator from "../component/icon/LoadingIndicator";

export default function () {
  const [state, setState] = useState({
    suggestions: ['Moltres', 'Zapdos', 'Articuno']
  })

  // const navigation = useNavigation()
  // const loc = useLocation()
  // const nav = useNavigate()
  // useEffect(() => {
  //   console.log('navigation', navigation)
  //   console.log('loc', loc)
  //   console.log('nav', nav)
  // }, [navigation, loc, nav]);

  const onChangeUsername = (e: any) => {
    setState(s => ({...s, username: e.target.value}))
    // TODO: validation
  }

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <BackButton className="absolute"/>
      <img src={usernameSvg}
           alt="woman sitting with a pen and notepad"
           className="mx-auto w-3/4"/>
      <Input className="mt-6" placeholder="Username" label="Choose your Dash username" onChange={onChangeUsername}/>

      <div className="dp-validation mt-4">
        <div className="pending">
          <div className="mt-1 flex items-center">
            <LoadingIndicator variant="dot" loading={false} className="ml-[6px] mr-[3px]"/>
            <span className="text-dp-grey font-light ml-2">Minimum 3 characters</span>
          </div>
        </div>
        <div className="loading">
          <div className="mt-1 flex items-center">
            <LoadingIndicator variant="dot" loading={true} className="ml-[6px] mr-[3px]"/>
            <span className="text-dp-grey font-light ml-2 text-dp-purple">Checking the username</span>
          </div>
        </div>
        <div className="valid">
          <div className="mt-1 flex items-center">
            <div className="p-[4px] bg-dp-green/10 rounded-full">
              <CheckmarkSharp height=".9rem" width=".8rem" color="rgb(var(--green))" />
            </div>
            <span className="text-dp-grey font-light ml-2 text-dp-green">Letters, numbers and hyphen only</span>
          </div>
        </div>
        <div className="invalid">
          <div className="mt-1 flex items-center">
            <div className="p-[4px] bg-dp-red/10 rounded-full">
              {/*<Ban stroke="hsl(349, 100%, 69%)" className="scale-[1.3]"/>*/}
              <Ban height=".9rem" width=".8rem" color="rgb(var(--red))" />
            </div>
            <span className="text-dp-grey font-light ml-2 text-dp-red">Username is already taken</span>
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