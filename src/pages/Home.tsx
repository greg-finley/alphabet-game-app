import React from "react";
import ReactGA from "react-ga4";
import MostRecentScoreboard from "../components/MostRecentScoreboard";
import TopAppBar from "../components/TopAppBar";
import { Play, Sport, sports, State } from "../types";
import styles from "./Home.module.css";
import { ScrollRestoration, useSearchParams } from "react-router-dom";

interface HomeProps {
  state: State;
  defaultSportIndex?: number;
  isCustomPlay?: boolean;
}

export default function Home(props: HomeProps) {
  let { state, defaultSportIndex, isCustomPlay } = props;

  let customPlay: Play | undefined;
  const [searchParams] = useSearchParams();

  if (isCustomPlay) {
    const playerName = searchParams.get("player_name");
    const completedAt = searchParams.get("completed_at");
    const matchingLetters = searchParams.get("matching_letters");
    const nextLetter = searchParams.get("next_letter");
    const playerId = searchParams.get("player_id");
    const seasonPhrase = searchParams.get("season_phrase");
    const sport = searchParams.get("sport") as Sport | undefined;
    const timesCycled = searchParams.get("times_cycled");
    const tweetId = searchParams.get("tweet_id");
    if (
      !playerName ||
      !completedAt ||
      !matchingLetters ||
      !nextLetter ||
      !playerId ||
      !seasonPhrase ||
      !sport ||
      !sports.includes(sport) ||
      !timesCycled ||
      !tweetId
    ) {
      throw new Error("Missing field for custom play");
    }

    customPlay = {
      completed_at: parseInt(completedAt),
      matching_letters: matchingLetters.split(","),
      next_letter: nextLetter,
      player_id: parseInt(playerId),
      player_name: playerName,
      season_phrase: seasonPhrase,
      sport,
      times_cycled: parseInt(timesCycled),
      tweet_id: tweetId,
    };
    defaultSportIndex = sports.indexOf(customPlay.sport);
  } else {
    customPlay = undefined;
  }

  ReactGA.event({
    category: "User",
    action: "Visited home page",
  });

  return (
    <>
      <ScrollRestoration />
      <TopAppBar />
      <div className="App-container">
        <div className={styles.mostRecentScoresContainer}>
          <p className="App-text-intro">
            Let's play the Sports Alphabet Game, looking for the next letter in
            player names as they:
          </p>
          <p className="App-text-intro">• score NHL goals</p>
          <p className="App-text-intro">• dunk in the NBA</p>
          <p className="App-text-intro">• score NFL touchdowns</p>
          <p className="App-text-intro">• and hit MLB home runs.</p>
          <p className="App-text-intro" style={{ paddingBottom: "15px" }}>
            Pick the sport below, or follow along on Twitter!
          </p>
          <MostRecentScoreboard
            state={state}
            defaultSportIndex={defaultSportIndex || 0}
            customPlay={customPlay}
          />
        </div>
      </div>
    </>
  );
}
