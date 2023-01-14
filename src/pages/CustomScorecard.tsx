import React from "react";
import ReactGA from "react-ga4";
import { useSearchParams } from "react-router-dom";
import ScoreboardCard from "../components/ScoreboardCard";
import { PlayLite } from "../types";

export default function CustomScorecard() {
  ReactGA.event({
    category: "User",
    action: "Created custom scorecard",
  });

  const [searchParams] = useSearchParams();
  const playerName = searchParams.get("player_name");

  const play: PlayLite = {
    completed_at: 1673587932,
    matching_letters: ["C"],
    next_letter: "D",
    player_id: 8478403,
    player_name: playerName || "Connor McDavid",
    season_phrase: "in the 2022-23 season",
    sport: "NHL",
    times_cycled: 22,
    tweet_id: "1613770857377136640",
  };

  return <ScoreboardCard play={play} />;
}
