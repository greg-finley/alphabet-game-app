import React from "react";

interface SingleDigitBoxProps {
  digit: string;
  type: string;
  digits: string;
}

export default function SingleDigitBox(props: SingleDigitBoxProps) {
  const { digit, type, digits } = props;

  return (
    <div className="single-digit-box" data-type={type} data-digits={digits}>
      <div className="digit-live digit-style">{digit}</div>
      <div className="digit-silhouette digit-style"></div>
    </div>
  );
}
