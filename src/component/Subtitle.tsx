import React from "react";

export default function (props: any) {
  return (
    <div {...{
      ...props,
      className: props.className + " text-lg text-black font-semibold",
    }}/>
  )
}