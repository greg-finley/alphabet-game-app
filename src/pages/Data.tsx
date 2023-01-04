import React from "react";
import CSV from "../components/CSV";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import ReactGA from "react-ga4";

interface DataProps {
  state: State;
}

export default function Data(props: DataProps) {
  const { state } = props;
  ReactGA.event({
    category: "User",
    action: "Visited data page",
  });

  return (
    <>
      <TopAppBar />
      <div className="App-container">
        <p className="App-text-intro">
          All scores that have been tweeted are available below to download as a
          CSV. They are also available{" "}
          <a href="https://github.com/greg-finley/alphabet-game-plays-api#api">
            via an API
          </a>
          .
        </p>
        <div>
          {state.type === "loading" ? (
            <LoadingCircle />
          ) : state.type === "error" ? (
            <ErrorMessage error={state.error} />
          ) : (
            <div style={{ display: "flex", justifyContent: "left" }}>
              <CSV data={state.plays} filename={"all_scores"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
