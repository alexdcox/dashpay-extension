import React from "react";
import useContextMenu from "./useContextMenu";
import {Calendar} from "react-ionicons";
import SentIcon from "../../asset/icon/sent.svg?react";
import ReceivedIcon from "../../asset/icon/received.svg?react";

export default function () {
  return useContextMenu({
    options: [{
      text: 'Sort by date',
      icon: <Calendar width="16px" color="rgb(var(--purple))"/>,
      onClick: () => {
      }
    }, {
      text: 'Show Received',
      icon: <ReceivedIcon className="w-[14px] h-[14px] stroke-dp-green"/>,
      iconBackgroundColor: 'bg-dp-green/10',
      onClick: () => {
      },
    }, {
      text: 'Show Sent',
      icon: <SentIcon className="w-[14px] h-[14px] stroke-dp-purple"/>,
      onClick: () => {
      }
    }]
  })
}