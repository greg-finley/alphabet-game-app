import React, { useEffect, useReducer } from "react";
import CSV from "../components/CSV";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import SimpleAccordion from "../components/SimpleAccordion";
import TopAppBar from "../components/TopAppBar";
import { Play } from "../types";
import ReactGA from "react-ga4";

type State =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "success"; plays: Play[] };

type Action =
  | { type: "FETCH_SUCCESS"; payload: Play[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = { type: "loading" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { type: "success", plays: action.payload };
    case "FETCH_ERROR":
      return { type: "error", error: action.payload };
  }
}

export default function Home() {
  ReactGA.initialize("G-8MTY2HPTR0");
  ReactGA.event({
    category: "User",
    action: "Visited data page",
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(
      `https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?matches_only=true&limit=0`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json().then((x) => x.data) as Promise<Play[]>;
      })
      .then((plays) => {
        dispatch({ type: "FETCH_SUCCESS", payload: plays });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      });
  }, []);

  return (
    <>
      <TopAppBar />
      <header className="App-header">
        <p className="App-text-intro">
          All scores that have been tweeted are available here to download as a
          CSV.
        </p>
        <SimpleAccordion
          defaultExpanded={true}
          title={"All Scores"}
          content={
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
          }
        />
      </header>
    </>
  );
}
