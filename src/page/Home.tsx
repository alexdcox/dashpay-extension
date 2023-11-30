import React from 'react'
import MenuIcon from "../component/MenuIcon";
import Text from "../component/Text";
import walletImage from "../asset/image/wallet.svg";
import checklistImage from "../asset/image/checklist.svg";
import parkRelaxingImage from "../asset/image/parkrelaxing.svg";
import LegacyPayments from "../component/LegacyPayments";
import ProfileCircle from "../component/ProfileCircle";
import Pill from "../component/Pill";
import {EyeOutline, PersonAdd, Scan, SearchOutline} from "react-ionicons";
import SearchInput from "../component/SearchInput";

export default function (props: any) {
  const WalletRecoverCard = () => (
    <div className="mt-3 p-3 rounded-xl bg-blue-50 flex">
      <div className="flex flex-col">
        <Text type="title-6-reg">Your wallet will recover soon!</Text>
        <Text type="text-8" className="text-gray-600">It may take a couple of minutes</Text>
        <div className="mt-2 w-[80%] h-[2px] rounded bg-white">
          <div className="w-[30%] rounded bg-dp-bg-purple h-full"></div>
        </div>
      </div>
      <img src={walletImage} alt="wallet with confetti" className="w-20 ml-auto"/>
    </div>
  )

  const ProfileCompletionCard = () => (
    <div className="mt-3 p-3 rounded-xl bg-dp-bg-green flex overflow-hidden">
      <div className="flex flex-col">
        <Text type="title-6-reg" className="w-4/5">Your profile is 80% complete</Text>
        <Text type="text-8" className="text-gray-600"></Text>
        <div className="mt-2 w-[80%] h-[2px] rounded bg-white">
          <div className="w-[80%] rounded bg-dp-text-green h-full"></div>
        </div>
      </div>
      <img src={checklistImage} alt="wallet with confetti" className="w-20 ml-auto -mt-3 -mb-4"/>
    </div>
  )


  return (
    <div className="dp-home flex flex-col flex-grow flex-start">
      <section className="profile">
        <div className="flex flex-row">
          <ProfileCircle variant="primary">
            D
          </ProfileCircle>
          <div className="flex flex-col ml-3">
            <div className="flex flex-row items-center">
              <Text type="title-4">Deohge</Text>
              <EyeOutline height="1.1rem" width="1.1rem" color="var(--Gray-text)" cssClasses="ml-1" />
            </div>
            <div className="flex flex-row">
              <Text type="text-4">13.20323 Dash</Text>
              <Text type="text-4" className="text-dp-text-gray ml-1">(6435MM VES)</Text>
            </div>
          </div>
          <MenuIcon/>
        </div>
      </section>
      <section className="cards">
        <WalletRecoverCard/>
        {/*<ProfileCompletionCard/>*/}
      </section>
      <section className="search">
        <SearchInput className="mt-3"/>
      </section>
      <section className="activity">
        <LegacyPayments className="mt-3"/>
        <div className="mt-3 flex items-center">
          <ProfileCircle className="bg-[#7CC8C5]">A</ProfileCircle>
          <div className="flex-col ml-3 w-full">
            <div className="flex flex-row items-center">
              <Text type="title-7">Alex</Text>
              <div className="text-xs ml-auto text-dp-text-purple">9:40pm</div>
            </div>
            <div className="flex flex-row items-center">
              <Text type="text-3" className="text-dp-text-gray-dark">Received</Text>
              <Pill variant="received" amount={0.0331}/>
              <div className="flex ml-auto">
                <Pill variant="received-small"/>
                <Pill variant="primary">12</Pill>
              </div>
            </div>
          </div>
        </div>

        {/* This is just another dupliate of the one above - need to refactor */}
        <div className="mt-3 flex items-center">
          <ProfileCircle className="bg-[#FA7C7C]">M</ProfileCircle>
          <div className="flex-col ml-3 w-full">
            <div className="flex flex-row items-center">
              <Text type="title-7">Mary</Text>
              <Text type="text-5" className="ml-auto text-dp-text-purple">9:45pm</Text>
            </div>
            <div className="flex flex-row items-center">
              <Text type="text-3" className="text-dp-text-gray-dark">Requested</Text>
              <Pill variant="requested" amount={0.0331}/>
              <div className="flex ml-auto">
                <Pill variant="requested-small"/>
                <Pill variant="primary">3</Pill>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="splash-image mt-3">
        <img src={parkRelaxingImage} alt="A woman and man relax in a park"/>
      </section>
      <div className="overlay-buttons fixed bottom-0 right-0 pr-4 pb-6">
        <div className="flex h-full flex-col items-end align-bottom justify-end content-end space-y-4">
          <div className="button cursor-pointer bg-white w-[3.4rem] h-[3.4rem] rounded-full flex items-center justify-center">
            <Scan height="1.5rem" width="1.5rem" color="var(--Purple-text)" />
          </div>
          <div
            className="button cursor-pointer bg-gradient-to-tr from-[#627BFF] to-[#8D71FF] w-[3.4rem] h-[3.4rem] rounded-full flex items-center justify-center">
            <PersonAdd height="1.5rem" width="1.5rem" color="white" />
          </div>
        </div>
      </div>
    </div>
  )
}