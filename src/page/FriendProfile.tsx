/// <reference types="vite-plugin-svgr/client" />
import React, {useState} from 'react'
import people2Svg from '../asset/icon/people2.svg'
import DashSvg from '../asset/icon/dash.svg?react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import ProfileCircle from "../component/ProfileCircle";
import {debugMenu} from "../util";
import profilePlaceholderImage from '../asset/image/profile-placeholder.jpeg'
import {Chatbubble, People, QrCodeOutline, SearchOutline} from "react-ionicons";
import SearchInput from "../component/SearchInput";

export default function (props: any) {
  const [state, setState] = useState({
    friends: [{
      name: 'Anna',
      slug: 'anna1',
      profile: <ProfileCircle className="bg-[#DCC7FD]" size="xs">A</ProfileCircle>,
      shared: 7,
    },{
      name: 'Anna',
      slug: 'anna22',
      profile: (
        <ProfileCircle className="" variant="primary" size="xs">
          <img src={profilePlaceholderImage} alt=""/>
        </ProfileCircle>
      ),
      shared: 6,
    },{
      name: 'Bob',
      slug: 'billybobbarrington',
      profile: <ProfileCircle className="bg-[#ffc76e]" size="xs">B</ProfileCircle>,
      shared: 3,
    }]
  })

  const Friend = (props: any) => {
    const {account} = props
    return (
      <div className="flex items-center cursor-pointer">
        <div className="flex flex-row w-full">
          {account.profile}
          <div className="flex flex-col ml-3 w-full">
            <div className="flex flex-row items-center">
              <div className="flex flex-col">
                <Text type="title-7">{account.name}</Text>
                <Text type="text-4" className="text-dp-text-gray">{account.slug}</Text>
              </div>
              <div className="flex flex-row ml-auto">
                <Text type="text-2" className="text-dp-text-purple">{account.shared}</Text>
                <img src={people2Svg} alt="people" className="ml-1"/>
              </div>
            </div>
            {props.spacer && (
              <div className="w-full">
                <div className="spacer h-[1px] my-2 -mr-4 bg-slate-200"></div>
                <div className="clear-both"></div>
              </div>
            )}
          </div>
        </div>


      </div>
    )
  }

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="absolute flex items-center">
        <BackButton onClick={debugMenu()}/>
      </header>

      <section className="flex flex-col w-full justify-center items-center">
        <ProfileCircle size="lg" variant="primary">D</ProfileCircle>
        <Text type="title-4" className="mt-3">Deohge</Text>
        <Text type="text-4" className="text-dp-text-gray-dark">deohge</Text>
        <Text type="text-3" className="text-dp-text-gray-dark mt-3 w-4/5 text-center">I am Dashy and this is my status
          message</Text>
      </section>

      <section className="controls flex justify-center space-x-6 w-full my-4">
        <div className="w-[2.5rem] h-[2.5rem] bg-dp-bg-gray rounded-full flex items-center justify-center">
          <Chatbubble height="1.2rem" width="1.2rem" color="var(--Purple-text)" />
        </div>
        <div className="w-[2.5rem] h-[2.5rem] bg-dp-bg-gray rounded-full flex items-center justify-center">
          <DashSvg fill="var(--Purple-text)" className="scale-[0.9]"/>
        </div>
        <div className="w-[2.5rem] h-[2.5rem] bg-dp-bg-gray rounded-full flex items-center justify-center">
          <QrCodeOutline height="1.2rem" width="1.2rem" color="var(--Purple-text)" />
        </div>
      </section>

      <section className="user-info w-full mb-3">
        <div className="w-1/2 flex float-left items-center justify-center">
          <DashSvg fill="var(--Purple-text)" className="scale-[0.8]"/>
          <Text type="text-5" className="ml-1 text-dp-text-gray-dark">Joined May 2021</Text>
        </div>
        <div className="flex w-1/2 float-left items-center justify-center">
          <People height="1.2rem" width="1.2rem" color="var(--Purple-text)" />
          <Text type="text-5" className="ml-1 text-dp-text-gray-dark">Friends since June 2021</Text>
        </div>
      </section>

      <section className="w-full">
        <SearchInput placeholder="Search for users"/>
        <div className="tabs w-full flex flex-row mt-2">
          <div className="tab flex-grow">
            <Text type="text-2" className="tab-name text-center text-dp-text-purple pt-1 pb-3">Friends</Text>
            <div className="tab-underline h-[4px] -mt-[4px] bg-dp-bg-purple rounded"></div>
          </div>
          <div className="tab flex-grow">
            <Text type="text-2" className="tab-name text-center text-dp-text-purple py-1">Shared Friends</Text>
          </div>
        </div>

        <div className="w-full">
          <div className="mt-3">
            {state.friends.map((friend, index) => (
              <div key={index}>
                <Friend account={friend} spacer={index < state.friends.length - 1}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}