import * as React from "react";

interface TextBoxProps {
  text: (string | JSX.Element)[];
  big?: boolean;
}

export default function TextBox(props: TextBoxProps) {
  const { text, big } = props;
  return (
    <div className="Centered">
      <div className={`Text-box${big ? " Text-box-big" : ""}`}>
        {text.map((lineOrElement, index) =>
          typeof lineOrElement === "string" ? (
            <div key={index}>{lineOrElement}</div>
          ) : (
            lineOrElement
          )
        )}
      </div>
    </div>
  );
}
