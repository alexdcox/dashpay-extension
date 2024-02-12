import React from "react";

export default function ({
  children,
  className = '',
}) {
  return (
    <div {...{
      children,
      className: `text-lg text-black font-semibold ${className}`,
    }}/>
  )
}