import {QRCodeSVG} from "qrcode.react";
import qrDashSvg from "../asset/icon/qr-dash.svg";

export default function ({
  address = '',
  className = '',
}) {
  return (
    <div className={`p-4 rounded-2xl shadow-md border border-slate-100 ${className}`}>
      <QRCodeSVG
        value={address}
        style={{height: "auto", maxWidth: "100%", width: "100%"}}
        imageSettings={{
          src: qrDashSvg,
          excavate: true,
          width: 30,
          height: 30,
        }}/>
    </div>
  )
}