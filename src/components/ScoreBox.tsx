import React from "react";
import SingleDigitBox from "./SingleDigitBox";

interface ScoreBoxProps {
  letters: (string | null)[];
}

export default function ScoreBox(props: ScoreBoxProps) {
  const { letters } = props;
  const type = "score";
  return (
    <div>
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
