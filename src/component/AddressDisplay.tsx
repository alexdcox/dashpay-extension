import Text from "./Text";
import {CopyOutline,} from "react-ionicons";
import {toClipboard} from "../util";

export default function({
  address = '',
  className = '',
}) {
  const onClickCopyAddress = () => toClipboard(address)

  return (
    <div className={`flex items-center align-middle justify-center content-center ${className}`}>
      <Text type="title-7" className="">
        {address?.substring(0, 8)}...{address?.slice(-8)}
      </Text>
      <CopyOutline
        height="1.5rem"
        width="1.5rem"
        color="rgb(var(--purple))"
        cssClasses="ml-2 cursor-pointer"
        onClick={onClickCopyAddress}/>
    </div>
  )
}