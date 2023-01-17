import React from "react";
import "../fonts/ds-digital.css";

interface ScoreBoxProps {
  str: string;
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { str } = props;
  return (
    <div className="score-container">
      <div className="score-text">{str}</div>
    </div>
  );
}
