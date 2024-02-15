import React, {useState} from 'react'
import Button from "../component/PrimaryButton";
import findFriendsSvg from '../asset/image/findfriends.svg'
import shareValueSvg from '../asset/image/sharevalue.svg'
import discoverSvg from '../asset/image/discover.svg'
import {Link, useNavigate} from "react-router-dom";
import {useHistory} from "./Popup";

export default function() {
  const slides = [{
    title: 'Find Friends',
    text: "Instant, global borderless money.\n Send to anyone, anywhere",
    image: findFriendsSvg,
    imageClass: 'min-w-[440px] ml-[-70px]',
  },{
    title: 'Share Value',
    text: "Be a part of the future, claim your DashPay Identity today",
    image: shareValueSvg,
    imageClass: 'min-w-[460px] ml-[-80px] mt-[-20px]',
  },{
    title: 'Discover',
    text: "Traverse the global Dash DApp ecosystem and the decentralized web",
    image: discoverSvg,
    imageClass: 'min-w-[370px] ml-[-5px] mt-[-40px]',
  }]

  const history = useHistory()
  const nav = useNavigate()
  const lastPath = history[history.length - 2]?.pathname
  const [state, setState] = useState({activeSlide: 0})

  const onNext = () => {
    if (state.activeSlide == slides.length - 1) nav('/username', {state: {allowBack: true}})
    const activeSlide = (state.activeSlide + 1) % slides.length
    setState({...state, activeSlide})
  }
  const onSelect = (index: number) => setState({...state, activeSlide: index})
  const cls = {
    selector: {
      active: 'w-[8px] h-[8px] bg-dp-purple',
      inactive: 'w-[6px] h-[6px] bg-slate-200 cursor-pointer'
    }
  }
  return (
    <div className="dp-welcome flex flex-grow flex-col">
      {slides.filter((_, i) => i == state.activeSlide).map((slide, k) => (
        <div key={k} className="dp-welcome-slide flex flex-col items-center">
          <div className="mt-14 h-[220px] w-full">
            <img src={slide.image} alt={slide.title} className={slide.imageClass}/>
          </div>
          <h2 className="text-xl font-bold mt-14">{slide.title}</h2>
          <span className="text-base font-light text-dp-gray text-center mt-2 leading-tight max-w-[85%]">{slide.text}</span>
        </div>
      ))}
      <div className="dp-welcome-slide-selector flex flex-grow justify-center items-start mt-6">
        <div className="flex justify-center items-center">
          {slides.map((slide, k) => (
            <div key={k}
                 onClick={() => onSelect(k)}
                 className={"mr-2 bg-red rounded-full " + (k == state.activeSlide ? cls.selector.active : cls.selector.inactive)}/>
          ))}
        </div>
      </div>
      <Button onClick={() => onNext()}>Next</Button>
      {state.activeSlide == slides.length - 1 && (
        <div className="flex justify-center items-center mt-3">
          <span className="text-sm text-dp-gray font-light">Already have an account?</span>
          <Link className="text-sm text-dp-purple font-semibold ml-1" to="/accounts" state={{allowBack: true}}>Login</Link>
        </div>
      )}
    </div>
  )
}