import * as React from "react";

interface TextBoxProps {
  text: string[];
  big?: boolean;
}

export default function TextBox(props: TextBoxProps) {
  const { text, big } = props;
  const { fontSize, padding } = big
    ? { fontSize: "1.2rem", padding: "0.3rem" }
    : { fontSize: "0.6rem", padding: "0.25rem" };
  return (
    <div className="Centered">
      <div
        style={{
          display: "inline-block",
          WebkitTextSizeAdjust: "100%",
          boxSizing: "border-box",
          fontWeight: 300,
          fontFamily: "Verdana,sans-serif",
          fontSize: fontSize,
          lineHeight: fontSize,
          backgroundColor: "#00000066",
          padding: padding,
          borderRadius: "0.3rem",
          whiteSpace: "pre-wrap",
          marginBottom: "0.1rem",
        }}
      >
        {text.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
}
