import React from "react";
import SingleDigitBox from "./SingleDigitBox";

type stringOrNull = string | null;

interface ScoreBoxProps {
  letters: [
    stringOrNull,
    stringOrNull,
    stringOrNull,
    stringOrNull,
    stringOrNull,
    stringOrNull
  ];
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { letters } = props;
  const type = "score";
  return (
    <div
      style={{
        lineHeight: 1.15,
        WebkitTextSizeAdjust: "100%",
        fontSize: "16px",
        fontFamily: "Open Sans,sans-serif",
        boxSizing: "border-box",
        padding: "0 6px",
        border: "1px solid #434343",
        backgroundColor: "#313131",
        borderRadius: "4px",
        textAlign: "center",
        boxShadow: "inset 0 0 15px 0 rgba(0,0,0,.7)",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {letters.map((letter, index) => (
        <SingleDigitBox
          key={index}
          digit={letter}
          type={type}
          digits={(letters.length + 1).toString()}
        ></SingleDigitBox>
      ))}
    </div>
  );
}
