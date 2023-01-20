import * as React from "react";

interface TextBoxProps {
  text: (string | JSX.Element | null)[];
  size?: "big" | "small";
}

export default function TextBox(props: TextBoxProps) {
  const { text, size } = props;
  const extraClass =
    size === "big"
      ? " Text-box-big"
      : size === "small"
      ? " Text-box-small"
      : "";
  return (
    <div className="Centered Text-box-container">
      <div className={`Text-box${extraClass}`}>
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
