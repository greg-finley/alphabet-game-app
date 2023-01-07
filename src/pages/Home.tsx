import React from "react";
import ReactGA from "react-ga4";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { Play } from "../types";
import styles from "./Home.module.css";
import { ScrollRestoration } from "react-router-dom";

interface HomeProps {
  plays: Play[];
}

export default function Home(props: HomeProps) {
  const { plays } = props;
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
        <div className={styles.mostRecentScoresContainer}>
          <MostRecentScoreboard plays={plays} />
        </div>
      </div>
    </>
  );
}
