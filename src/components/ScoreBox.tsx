import React from "react";
import "../fonts/ds-digital.css";

interface ScoreBoxProps {
  str: string;
  padWithUnderscores: boolean;
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { str, padWithUnderscores } = props;
  return (
    <div
      style={{
        lineHeight: 1.15,
        WebkitTextSizeAdjust: "100%",
        boxSizing: "border-box",
        border: "1px solid #434343",
        backgroundColor: "#313131",
        borderRadius: "4px",
        textAlign: "center",
        boxShadow: "inset 0 0 15px 0 rgba(0,0,0,.7)",
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        flexWrap: "wrap",
        marginTop: "0.3rem",
      }}
    >
      <div
        style={{
          fontFamily: "DS-Digital",
          fontWeight: 400,
          color: "#d10505",
          fontSize: "2.5rem",
          lineHeight: "2.5rem",
          padding: "0 6px",
          WebkitTextSizeAdjust: "100%",
          boxSizing: "border-box",
        }}
      >
        {padWithUnderscores ? str.padEnd(6, "_") : str}
      </div>
    </div>
  );
}
