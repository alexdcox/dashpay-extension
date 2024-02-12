import React, {useState} from "react";
import useModal from "./useModal";
import Text from "../Text";
import ContactList from "../list/ContactList";
import store from "../../store";
import { useEffect } from "react";

export default function () {
  const [state, setState] = useState({
    contacts: [],
  })

  useEffect(() => {
    store.getContacts().then(contacts => {
      setState({...state, contacts})
    })
  }, []);

  const modal = useModal({
    className: 'flex min-h-[200px] mb-0 pb-0',
    children: (
      <div className="flex flex-col flex-grow w-full">
        <Text type="title-4" className="mt-1 text-center">Friend request</Text>
        <div className="flex-col mt-4 overflow-y-scroll -mr-4 pr-6 py-4">
          <ContactList contacts={state.contacts} size="lg"/>
        </div>
      </div>
    )
  })

  return {...modal, state, setState}
}