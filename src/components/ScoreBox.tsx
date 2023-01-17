import React from "react";
import "../fonts/ds-digital.css";

interface ScoreBoxProps {
  str: string;
  center?: boolean;
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { str, center } = props;
  return (
    <div className={`score-container ${center ? "Centered" : ""}`}>
      <div className="score-text">{str}</div>
    </div>
  );
}
