import React from "react";
import CSV from "../components/CSV";
import LoadingCircle from "../components/LoadingCircle";
import TopAppBar from "../components/TopAppBar";
import { Play } from "../types";
import ReactGA from "react-ga4";
import { ScrollRestoration } from "react-router-dom";

interface DataProps {
  plays: Play[];
}

export default function Data(props: DataProps) {
  const { plays } = props;
  ReactGA.event({
    category: "User",
    action: "Visited data page",
  });

  return (
    <>
      <ScrollRestoration />
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
          {!plays ? (
            <LoadingCircle />
          ) : (
            <div style={{ display: "flex", justifyContent: "left" }}>
              <CSV data={plays} filename={"all_scores"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
