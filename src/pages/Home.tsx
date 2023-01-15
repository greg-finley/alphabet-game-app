import React from "react";
import ReactGA from "react-ga4";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import styles from "./Home.module.css";
import { ScrollRestoration } from "react-router-dom";

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
          names as they:
        </p>
        <p className="App-text-intro">• score NHL goals</p>
        <p className="App-text-intro">• dunk in the NBA</p>
        <p className="App-text-intro">• score NFL touchdowns</p>
        <p className="App-text-intro">• and hit MLB home runs.</p>
        <p className="App-text-intro">
          Pick the sport below, or follow along on Twitter!
        </p>
        <div className={styles.mostRecentScoresContainer}>
          <MostRecentScoreboard state={state} />
        </div>
      </div>
    </>
  );
}
