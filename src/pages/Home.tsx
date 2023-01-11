import React from "react";
import ReactGA from "react-ga4";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import styles from "./Home.module.css";
import { ScrollRestoration } from "react-router-dom";
import ScoreBox from "../components/ScoreBox";

interface HomeProps {
  state: State;
}

export default function Home(props: HomeProps) {
  const { state } = props;
  ReactGA.event({
    category: "User",
    action: "Visited home page",
  });

  return (
    <>
      <ScrollRestoration />
      <TopAppBar />
      <div className="App-container">
        <p className="App-text-intro">
          Let's play the Alphabet Game, looking for the next letter in player
          names as they hit MLB home runs, score NHL goals, dunk in the NBA, and
          score NFL touchdowns. Follow along on Twitter!
        </p>
        <div>
          <ScoreBox letters={["A", "B", "C", null, null, null]} />
        </div>
        <div className={styles.mostRecentScoresContainer}>
          <MostRecentScoreboard state={state} />
        </div>
      </div>
    </>
  );
}
