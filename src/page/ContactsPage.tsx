import React, {useEffect, useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import {Scan} from "react-ionicons";
import SearchInput from "../component/SearchInput";
import store from "../store";
import ContactList from "../component/list/ContactList";
import ProfileCircle from "../component/ProfileCircle";
import SecondaryButton from "../component/SecondaryButton";
import useFriendRequestModal from "../component/modal/useFriendRequestModal";

export default function () {
  const [state, setState] = useState({
    search: '',
    users: [],
    friends: [],
    suggestedFriends: [],
    friendRequests: [],
  })

  useEffect(() => {
    Promise
      .all([
        store.getUsers(),
        store.getFriends(),
        store.getSuggestedFriends(),
        store.getFriendRequests(),
      ])
      .then(([users, friends, suggestedFriends, friendRequests]) => {
        setState({...state, users, friends, suggestedFriends, friendRequests})
      })
  }, [])

  const onSearch = () => {}

  const friendRequestModal = useFriendRequestModal()

  const onShowFriendRequests = () => friendRequestModal.setOpen(true)

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">

      <header className="flex mb-2 w-full items-center">
        <BackButton/>
        <Text type="title-4">Contacts</Text>
        <div className="ml-auto">
          <Scan color="rgb(var(--purple))" cssClasses="cursor-pointer"/>
        </div>
      </header>

      <friendRequestModal.Component/>

      <SearchInput value={state.search} onChange={onSearch}/>

      <section className="results w-full">
        {state.friendRequests.length && (
          <>
            <Text type="text-3" className="text-dp-gray my-3">Friend requests</Text>
            <div className="flex flex-grow w-full items-center">
              {state.friendRequests.map(r => (
                <div className="w-[22px] float-left">
                  <ProfileCircle size="xxs" user={r} className="border-2 border-white"/>
                </div>
              ))}
              <ProfileCircle size="xxs" className="border-2 border-white bg-gray-100 !text-gray-600 font-semibold">
                3+
              </ProfileCircle>

              <SecondaryButton className="ml-auto !py-1.5 bg-dp-purple/10"
              onClick={onShowFriendRequests}>Show requests</SecondaryButton>
            </div>
          </>
        )}

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