import React, {useEffect, useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import {Scan} from "react-ionicons";
import SearchInput from "../component/SearchInput";
import store from "../store";
import ContactList from "../component/list/ContactList";

export default function () {
  const [state, setState] = useState({
    search: '',
    users: [],
    friends: [],
    suggestedFriends: [],
  })

  useEffect(() => {
    Promise
      .all([
        store.getUsers(),
        store.getFriends(),
        store.getSuggestedFriends(),
      ])
      .then(([users, friends, suggestedFriends]) => {
        setState({...state, users, friends, suggestedFriends})
      })
  }, [])

  const onSearch = () => {}

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex mb-2 w-full items-center">
        <BackButton/>
        <Text type="title-4">Contacts</Text>
        <div className="ml-auto">
          <Scan color="rgb(var(--purple))" cssClasses="cursor-pointer"/>
        </div>
      </header>

      <SearchInput value={state.search} onChange={onSearch}/>

      <section className="results w-full">
        <Text type="text-3" className="text-dp-gray my-3">Friends</Text>
        <ContactList contacts={state.friends}/>

        <Text type="text-3" className="text-dp-gray my-3">Suggested Friends</Text>
        <ContactList contacts={state.suggestedFriends}></ContactList>

        <Text type="text-3" className="text-dp-gray my-3">Everyone</Text>
        <ContactList contacts={state.users}></ContactList>

      </section>

    </div>
  )
}