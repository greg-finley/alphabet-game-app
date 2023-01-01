import * as React from "react";
import { Play } from "../types";
import ScoreboardCard from "./ScoreboardCard";

interface MostRecentScoresProps {
  plays: Play[];
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { plays } = props;
  const mostRecentScores = plays.reduce((acc, x) => {
    // Only keep the first play for each sport
    if (!acc[x.sport]) {
      acc[x.sport] = x;
    }
    return acc;
  }, {} as Record<string, Play>);
  return (
    <>
      <div>
        {Object.values(mostRecentScores).map((play) => (
          <ScoreboardCard play={play} key={play.sport + play.player_id} />
        ))}
      </div>
    </>
  );
}

export default MostRecentScoreboard;
