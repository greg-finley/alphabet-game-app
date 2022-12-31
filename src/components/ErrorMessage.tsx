import * as React from "react";

interface MostRecentScoresProps {
  error: string;
}

function ErrorMessage(props: MostRecentScoresProps) {
  const { error } = props;
  return <p>{`There is a problem fetching the data - ${error}`}</p>;
}

export default ErrorMessage;
