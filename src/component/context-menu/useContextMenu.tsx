import React, {useState} from "react";
import Menu from "./ContextMenu";

// NOTE: I'd much rather export this as useContextMenu, but due to the vite hmr
//       limitations in tsx files you can only export a single anonymous
//       function component.
//       See: https://github.com/vitejs/vite-plugin-react/issues/34
export default function(props: any) {
  const [open, setOpen] = useState(false)
  return ({
    component: open && <Menu {...{...props, onClose: () => setOpen(false)}}/>,
    setOpen,
  })
}