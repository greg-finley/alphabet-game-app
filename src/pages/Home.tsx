import React from "react";
import ReactGA from "react-ga4";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import styles from "./Home.module.css";

interface HomeProps {
  state: State;
}

export default function Home(props: HomeProps) {
  const { state } = props;
  ReactGA.initialize("G-8MTY2HPTR0");
  ReactGA.event({
    category: "User",
    action: "Visited home page",
  });

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
