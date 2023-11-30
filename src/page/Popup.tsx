import React, {useEffect} from 'react';
import {createMemoryRouter, Link, RouterProvider} from "react-router-dom";
import Pin from "./Pin";
import Welcome from "./Welcome";
import BackupPhrase from "./BackupPhrase";
import Fingerprint from "./Fingerprint";
import Home from "./Home";
import Accounts from "./Accounts";
import RecoverWallet from "./RecoverWallet";
import Username from "./Username";
import FriendProfile from "./FriendProfile";
import Settings from "./Settings";
import Chat from "./Chat";
import Transactions from "./Transactions";
import Contacts from "./Contacts";

const routes = [
  {
    path: "/",
    element: <Accounts/>
  },
  {
    path: "/welcome",
    element: <Welcome/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/backup",
    element: <BackupPhrase/>
  },
  {
    path: "/pin",
    element: <Pin/>
  },
  {
    path: "/fingerprint",
    element: <Fingerprint/>
  },
  {
    path: "/username",
    element: <Username/>
  },
  {
    path: "/accounts",
    element: <Accounts/>
  },
  {
    path: "/recover",
    element: <RecoverWallet/>
  },
  {
    path: "/profile",
    element: <FriendProfile/>
  },
  {
    path: "/settings",
    element: <Settings/>
  },
  {
    path: "/chat",
    element: <Chat/>
  },
  {
    path: "/transactions",
    element: <Transactions/>
  },
  {
    path: "/contacts",
    element: <Contacts/>
  },
]

routes.push({
    path: "debug",
    element: (
      <ul>
        {routes.filter(r => r.path.match(/^\/$/) == null).map((r, k) => (
          <li key={k}>
            <Link to={r.path}>{r.path}</Link>
          </li>
        ))}
      </ul>
    )
  },
)

const router = createMemoryRouter(routes);

export default function () {
  useEffect(() => {
    console.log("Hello from the popup!");
  }, []);

  return (
    <div className="dp-popup p-4 overflow-x-hidden no-scrollbar overflow-y-auto bg-white flex flex-col flex-grow">
      <RouterProvider router={router}/>
    </div>
  )
}
