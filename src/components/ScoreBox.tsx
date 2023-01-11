import React from "react";
import SingleDigitBox from "./SingleDigitBox";

interface ScoreBoxProps {
  theme: string;
  letter: string;
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { theme, letter } = props;
  const type = "score";
  return (
    <div className={"integer-box " + theme}>
      <SingleDigitBox digit={letter} type={type} digits="1"></SingleDigitBox>
    </div>
  );
}
