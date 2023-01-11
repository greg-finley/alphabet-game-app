import React from "react";
import ReactGA from "react-ga4";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import styles from "./Home.module.css";
import { ScrollRestoration } from "react-router-dom";
import "../fonts/ds-digital.css";

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
        <div
          style={{
            lineHeight: 1.15,
            WebkitTextSizeAdjust: "100%",
            fontSize: "16px",
            fontFamily: "Open Sans,sans-serif",
            boxSizing: "border-box",
            border: "1px solid #434343",
            backgroundColor: "#313131",
            borderRadius: "4px",
            textAlign: "left",
            boxShadow: "inset 0 0 15px 0 rgba(0,0,0,.7)",
            display: "flex",
            width: "fit-content",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "DS-Digital",
              fontWeight: 400,
              color: "#f9bc32",
              fontSize: "3rem",
              lineHeight: "3rem",
              padding: "0 6px",
              WebkitTextSizeAdjust: "100%",
              boxSizing: "border-box",
            }}
          >
            QKL___
          </div>
        </div>
        <div className={styles.mostRecentScoresContainer}>
          <MostRecentScoreboard state={state} />
        </div>
      </div>
    </>
  );
}
