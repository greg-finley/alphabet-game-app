import * as React from "react";

interface TextBoxProps {
  text: (string | JSX.Element | null)[];
  big?: boolean;
}

export default function TextBox(props: TextBoxProps) {
  const { text, big } = props;
  return (
    <div className="Centered Text-box-container">
      <div className={`Text-box${big ? " Text-box-big" : ""}`}>
        {text.map((lineOrElement, index) =>
          lineOrElement === null ? null : typeof lineOrElement === "string" ? (
            <div key={index}>{lineOrElement}</div>
          ) : (
            lineOrElement
          )
        )}
      </div>
    </div>
  );
}
