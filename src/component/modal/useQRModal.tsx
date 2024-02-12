import useModal from "./useModal";
import Text from "../Text";
import QRCode from "../QRCode";
import AddressDisplay from "../AddressDisplay";
import {Share} from "react-ionicons";

export default function({address = ''} = {}) {
  return (
    useModal({
      children: (
        <div className="flex flex-col items-center">
          <Text type="title-4" className="mt-1">Dash Address</Text>
          <QRCode address={`dash?${address}`} className="w-3/5 mt-4 mb-6"/>
          <AddressDisplay address={address}/>
          <div className="rounded-full px-5 py-2 flex items-center bg-dp-purple/10 cursor-pointer mt-4">
            <Text type="title-7" className="text-dp-purple">Share</Text>
            <Share height="1.3rem" width="1.3rem" color="rgb(var(--purple))" cssClasses="ml-2"/>
          </div>
        </div>
      )
    })
  )
}