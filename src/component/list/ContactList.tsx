import React from "react";
import List from "./List";
import ProfileCircle from "../ProfileCircle";
import Text from "../Text";
import people2Svg from "../../asset/icon/people2.svg";

export default function(props: any) {
  const {contacts = [], size} = props
  let entries = contacts
  return <List {...{
    entries,
    size,
    iconContent: (x: any) => (
      <ProfileCircle user={x} size={size === 'lg' ? 'sm' : 'xs'}/>
    ),
    mainContent: (x: any) => (
      <div className="overflow-hidden mr-4">
        <Text type="title-7" className="truncate">{x.name}</Text>
        <Text type="text-4" className="truncate text-dp-text-gray">{x.username}</Text>
      </div>
    ),
    rightContent: (x: any) => x.shared ? (
      <div className="flex flex-row ml-auto">
        <Text type="text-2" className="text-dp-text-purple">{x.shared}</Text>
        <div className="flex w-[22px] ">
          <img src={people2Svg} alt="people" className="ml-1"/>
        </div>
      </div>
    ) : null,
  }}/>
}
