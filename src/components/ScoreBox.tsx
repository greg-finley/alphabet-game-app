import React from "react";
import "../fonts/ds-digital.css";

interface ScoreBoxProps {
  str: string;
  fit?: boolean;
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { str, fit } = props;
  return (
    <div
      className={"score-container Centered"}
      style={fit ? { width: "fit-content" } : {}}
    >
      <div className="score-text">{str}</div>
    </div>
  );
}
