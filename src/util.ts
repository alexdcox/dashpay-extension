import {useNavigate} from "react-router-dom";

export const debugMenu = () => {
  const nav = useNavigate()
  return () => nav('/debug')
}

// export const randomColor = () => '#7CC8C5'
export const randomColor = () => '#' + [...Array(6)].map(x => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')