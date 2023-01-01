import * as React from "react";
import { MostRecentScores } from "../types";
import ScoreboardCard from "./ScoreboardCard";

interface MostRecentScoresProps {
  mostRecentScores: MostRecentScores;
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { mostRecentScores } = props;
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
