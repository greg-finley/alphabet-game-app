import React from "react";
import CSV from "../components/CSV";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import ReactGA from "react-ga4";
import { ScrollRestoration } from "react-router-dom";

interface DataProps {
  state: State;
}

export default function Data(props: DataProps) {
  const { state } = props;
  const [isLoadingBigData, setIsLoadingBigData] = React.useState(false);
  const [bigData, setBigData] = React.useState<Promise<Record<string, any>[]>>(
    Promise.resolve([])
  );
  ReactGA.event({
    category: "User",
    action: "Visited data page",
  });

  return (
    <>
      <ScrollRestoration />
      <TopAppBar />
      <div className="App-container">
        <p className="App-text">
          All scores that have been tweeted are available below to download as a
          CSV. They are also available{" "}
          <a href="https://github.com/greg-finley/alphabet-game-plays-api#api">
            via an API
          </a>{" "}
          or
          <a href="https://storage.googleapis.com/greg-finley-public/alphabet-data.json">
            {" "}
            as JSON
          </a>
          .
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            paddingTop: "10px",
          }}
        >
          {state.type === "loading" ? (
            <LoadingCircle />
          ) : state.type === "error" ? (
            <ErrorMessage error={state.error} />
          ) : (
            <CSV
              data={state.plays}
              filename={"matching_scores"}
              title="Download matching letter plays"
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            paddingTop: "10px",
          }}
          onClick={async () => {
            setIsLoadingBigData(true);
            setBigData(
              fetch(
                "https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?limit=0"
              ).then((response) => response.json().then((x) => x.data))
            );
            setIsLoadingBigData(false);
            console.log("clicked");
          }}
        >
          {isLoadingBigData ? (
            <LoadingCircle />
          ) : (
            <CSV
              data={bigData}
              filename={"all_scores"}
              title="Download all plays (multiple MB)"
            />
          )}
        </div>
      </div>
    </>
  );
}
