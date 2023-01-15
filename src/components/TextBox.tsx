import * as React from "react";

interface TextBoxProps {
  text: string[];
  big?: boolean;
}

export default function TextBox(props: TextBoxProps) {
  const { text, big } = props;
  return (
    <div className="Centered">
      <div className={`Text-box${big ? " Text-box-big" : ""}`}>
        {text.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
}
