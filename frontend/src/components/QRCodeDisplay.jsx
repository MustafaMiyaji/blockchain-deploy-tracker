// QRCodeDisplay.jsx
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const secretPath = "/addlog-4a3b1f";
const qrValue = `${window.location.origin}${secretPath}`;

const QRCodeDisplay = () => {
  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h3>📱 Add Log Access (Secure)</h3>
      <p>Scan this to open the hidden deployment log form:</p>
      <QRCodeCanvas value={qrValue} size={180} bgColor="white" fgColor="black" />
      <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
        Path: <code>{secretPath}</code>
      </p>
    </div>
  );
};

export default QRCodeDisplay;
