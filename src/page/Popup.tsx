import React from 'react';
import {createMemoryRouter, Link, Navigate, RouterProvider} from "react-router-dom";
import Pin from "./PinPage";
import Welcome from "./WelcomePage";
import BackupPhrase from "./BackupPhrasePage";
import Fingerprint from "./FingerprintPage";
import Home from "./HomePage";
import Accounts from "./AccountsPage";
import RecoverWallet from "./RecoverWalletPage";
import Username from "./UsernamePage";
import FriendProfile from "./FriendProfilePage";
import Settings from "./SettingsPage";
import Chat from "./ChatPage";
import Transactions from "./TransactionsPage";
import Contacts from "./ContactsPage";
import EditProfile from "./EditProfilePage";
import TransactionsLegacy from "./TransactionsLegacyPage";
import ChatLegacy from "./ChatLegacyPage";

const routes = [
  {
    path: "/",
    element: <Navigate to="/debug"/>,
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
    path: "/transactions-legacy",
    element: <TransactionsLegacy/>
  },
  {
    path: '/chat-legacy',
    element: <ChatLegacy/>
  },
  {
    path: "/contacts",
    element: <Contacts/>
  },
  {
    path: "/edit-profile",
    element: <EditProfile/>
  },
]

routes.push({
    path: "/debug",
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
const routerHistory = []
router.subscribe(state => {
  routerHistory.push(state.location)
})
routerHistory.push(router.state.location)

export const useHistory = () => {
  return routerHistory
}

export default function () {
  return (
    <div className="dp-popup p-4 overflow-x-hidden no-scrollbar overflow-y-auto bg-white flex flex-col flex-grow">
      <RouterProvider router={router}/>
    </div>
  )
}
