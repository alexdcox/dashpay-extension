import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import ProfileCircle from "../component/ProfileCircle";
import Toggle from "../component/Toggle";
import {Cash, FingerPrint, HelpCircle, Keypad, Language, Notifications, QrCodeSharp} from "react-ionicons";

export default function () {
  const [state, setState] = useState({
  })
  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex items-center mb-4">
        <BackButton/>
        <Text type="title-4">Settings</Text>
      </header>

      <section className="profile w-full">
        <div className="flex flex-row items-center">
          <ProfileCircle variant="primary">
            D
          </ProfileCircle>
          <div className="flex flex-row">
            <div className="flex flex-col ml-3">
              <Text type="title-4">Deohge</Text>
              <Text type="text-4">deohge</Text>
            </div>
          </div>
          <div className="ml-auto">
            <QrCodeSharp height="2rem" width="2rem" color="rgb(var(--purple))"/>
          </div>
        </div>
      </section>

      <div className="spacer w-full h-[1px] my-4 bg-slate-200"></div>

      <section className="w-full">
        <Text type="text-3" className="text-dp-gray mb-3">Account</Text>
        <div className="flex flex-col grow">
          <div className="flex flex-row grow">
            <Cash height="1.5rem" width="1.5rem" color="rgb(var(--purple))" />
            <Text type="text-1" className="ml-3">Currency</Text>
            <Text type="text-1" className="ml-auto text-dp-gray">$ USD</Text>
          </div>
          <div className="flex flex-row grow mt-3">
            <Language height="1.5rem" width="1.5rem" color="rgb(var(--purple))" />
            <Text type="text-1" className="ml-3">Language</Text>
            <Text type="text-1" className="ml-auto text-dp-gray">English</Text>
          </div>
        </div>
      </section>

      <div className="spacer w-[110%] h-[1px] my-4 bg-slate-200 -ml-4"></div>

      <section className="w-full">
        <Text type="text-3" className="text-dp-gray mb-3">Security</Text>
        <div className="flex flex-col grow">
          <div className="flex flex-row grow">
            <FingerPrint height="1.5rem" width="1.5rem" color="rgb(var(--purple))" />
            <Text type="text-1" className="ml-3">Enable Touch ID/Face ID</Text>
            <div className="ml-auto">
              <Toggle/>
            </div>
          </div>
          <div className="flex flex-row grow mt-3">
            <Keypad height="1.5rem" width="1.5rem" color="rgb(var(--purple))" />
            <Text type="text-1" className="ml-3">Change PIN</Text>
          </div>
        </div>
      </section>

      <div className="spacer w-[110%] h-[1px] my-4 bg-slate-200 -ml-4"></div>

      <section className="w-full">
        <Text type="text-3" className="text-dp-gray mb-3">Notifications</Text>
        <div className="flex flex-col grow">
          <div className="flex flex-row grow">
            <Notifications height="1.5rem" width="1.5rem" color="rgb(var(--purple))" />
            <Text type="text-1" className="ml-3">Notification Settings</Text>
          </div>
        </div>
      </section>

      <div className="spacer w-[110%] h-[1px] my-4 bg-slate-200 -ml-4"></div>

      <section className="w-full">
        <Text type="text-3" className="text-dp-gray mb-3">About</Text>
        <div className="flex flex-col grow">
          <div className="flex flex-row grow">
            <HelpCircle height="1.5rem" width="1.5rem" color="rgb(var(--purple))" />
            <Text type="text-1" className="ml-3">Help & Feedback</Text>
          </div>
        </div>
      </section>

    </div>
  )
}