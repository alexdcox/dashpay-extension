import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import {debugMenu} from "../util";
import ContextMenu from "../component/ContextMenu";
import {Scan} from "react-ionicons";
import SearchInput from "../component/SearchInput";
import TransactionList from "../component/list/TransactionList";
import store from "../store";
import ContactList from "../component/list/ContactList";
import ProfileCircle from "../component/ProfileCircle";
import people2Svg from "../asset/icon/people2.svg";

export default function (props: any) {
  const [state, setState] = useState({
    users: store.getUsers(),
    friends: store.getFriends(),
    suggestedFriends: store.getSuggestedFriends(),
  })

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex mb-2 w-full items-center">
        <BackButton onClick={debugMenu()}/>
        <Text type="title-4">Contacts</Text>
        <Scan color="var(--Purple-text)" className="ml-auto"/>
      </header>

      <SearchInput/>

      <section className="results w-full">
        <Text type="text-3" className="text-dp-text-gray my-3">Friends</Text>
        <ContactList contacts={state.friends}/>

        <Text type="text-3" className="text-dp-text-gray my-3">Suggested Friends</Text>
        <ContactList contacts={state.suggestedFriends}></ContactList>

        <Text type="text-3" className="text-dp-text-gray my-3">Everyone</Text>
        <ContactList contacts={state.users}></ContactList>

      </section>

    </div>
  )
}