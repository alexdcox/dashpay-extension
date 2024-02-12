import { useEffect } from "react";
import Text from "../../component/Text";

export default function({className = ''}) {
  return (
    <div className={`flex grow justify-center ${className}`}>
      <Text type="text-7" className="px-2 py-1 rounded-lg bg-dp-purple/10 text-dp-purple">
        Aug 22
      </Text>
    </div>
  )
}
