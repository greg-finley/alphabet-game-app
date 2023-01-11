import React from "react";
import "../fonts/ds-digital.css";

interface SingleDigitBoxProps {
  digit: string;
  type: string;
  digits: string;
}

export default function SingleDigitBox(props: SingleDigitBoxProps) {
  const { digit, type, digits } = props;

  const digitStyle: React.CSSProperties = {
    fontFamily: "DS-Digital",
    fontWeight: 400,
    color: "#f9bc32",
    fontSize: "3rem",
    lineHeight: "3rem",
    top: 0,
    right: 0,
    padding: "0 6px",
    WebkitTextSizeAdjust: "100%",
    textAlign: "right",
    boxSizing: "border-box",
  };

  return (
    <div
      data-type={type}
      data-digits={digits}
      style={{
        lineHeight: 1.15,
        WebkitTextSizeAdjust: "100%",
        fontSize: "16px",
        fontFamily: "Open Sans,sans-serif",
        boxSizing: "border-box",
        textAlign: "right",
        position: "relative",
        width: "50%",
      }}
    >
      <div style={digitStyle}>{digit}</div>
      <div style={{ ...digitStyle, opacity: 0.08 }}>8</div>
    </div>
  );
}
