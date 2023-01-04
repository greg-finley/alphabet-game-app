import React, { useEffect, useReducer } from "react";
import ReactGA from "react-ga4";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { Play } from "../types";
import styles from "./Home.module.css";

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
    action: "Visited home page",
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
      <div className="App-container">
        <p className="App-text-intro">
          Let's play the Alphabet Game, looking for the next letter in player
          names as they hit MLB home runs, score NHL goals, dunk in the NBA, and
          score NFL touchdowns. Follow along on Twitter!
        </p>
        <div className={styles.mostRecentScoresContainer}>
          <h4 style={{ textAlign: "left" }}>Most Recent Scores</h4>
          {state.type === "loading" ? (
            <LoadingCircle />
          ) : state.type === "error" ? (
            <ErrorMessage error={state.error} />
          ) : (
            <MostRecentScoreboard plays={state.plays} />
          )}
        </div>
      </div>
    </>
  );
}
