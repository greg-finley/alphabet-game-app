import * as React from "react";
import { MostRecentScores, Play } from "../types";

interface MostRecentScoresProps {
  mostRecentScores: MostRecentScores;
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { mostRecentScores } = props;
  return (
    <>
      <div>{Object.values(mostRecentScores).map((x) => playerImage(x))}</div>
    </>
  );
}

const playerImage = (play: Play) => {
  let src = "";
  switch (play.sport) {
    case "NHL":
      src = `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${play.player_id}.jpg`;
      break;
    case "NFL":
      src = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${play.player_id}.png&h=110&w=110&scale=crop`;
      break;
    case "NBA":
      src = `https://cdn.nba.com/headshots/nba/latest/1040x760/${play.player_id}.png?imwidth=104&imheight=76`;
      break;
    case "MLB":
      src = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/h_1000,q_auto:best/v1/people/${play.player_id}/headshot/67/current`;
      break;
  }
  return (
    <div className="Player-image-container" key={play.sport + play.player_id}>
      <img
        className="Player-image"
        src={src}
        alt={play.player_name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&h=110&w=110&scale=crop";
        }}
      />
      <div>{play.next_letter}</div>
      <div>{play.matching_letters.join(", ")}</div>
      <div>{play.times_cycled}</div>
      <div>{play.completed_at}</div>
    </div>
  );
};

export default MostRecentScoreboard;
