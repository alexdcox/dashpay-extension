import React, {useState} from "react";
import Modal from "./Modal";

export default function(props: any) {
  const [open, setOpen] = useState(props.open || false)
  return ({
    Component: () => (
      <>
        {open && <Modal {...{...props, onClose: () => setOpen(false)}}/>}
      </>
    ),
    setOpen,
  })
}