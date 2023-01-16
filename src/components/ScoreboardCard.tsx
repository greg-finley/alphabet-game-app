import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Play, Sport } from "../types";
import ScoreBox from "./ScoreBox";
import TextBox from "./TextBox";

dayjs.extend(relativeTime);

interface ScoreboardCardProps {
  play: Play;
  customCard?: boolean; // Card generated on the fly, to post on Twitter
}

export default function ScoreboardCard(props: ScoreboardCardProps) {
  const { play, customCard: custom } = props;
  return (
    <>
      <div className="player-rect">
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: "white",
          }}
          src={playerImageSrc(play)}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&h=110&w=110&scale=crop";
          }}
          alt={play.player_name}
        />
      </div>
      <div className="info-rect">
        <TextBox
          text={[
            sportScore(play.sport) + "!",
            " ",
            dayjs().to(dayjs.unix(play.completed_at)),
          ]}
        />
      </div>
      <div className="score-rect">
        <div style={{ marginBottom: "0.1rem" }}>
          <TextBox text={[play.player_name]} big={true} />
        </div>
        <div className="score-and-text-box box-left">
          <TextBox
            text={[
              "His name has the letter" +
                (play.matching_letters.length === 1 ? "" : "s"),
              <ScoreBox
                str={play.matching_letters.join("")}
                padWithUnderscores={false}
              />,
            ]}
          />
        </div>
        <div className="score-and-text-box box-right">
          <TextBox
            text={[
              "Next letter in the Alphabet Game",
              <ScoreBox str={play.next_letter} padWithUnderscores={false} />,
            ]}
          />
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: "0.6rem",
            top: "90%",
            right: "0%",
            paddingRight: "0.5rem",
          }}
        >
          {!custom ? (
            <a
              href={`https://twitter.com/${play.sport}AlphabetGame/status/${play.tweet_id}`}
              style={{
                textDecoration: "none",
                color: "#f9bc32",
              }}
            >
              {`@${play.sport}AlphabetGame`}
            </a>
          ) : (
            "sportsalphabetgame.com"
          )}
        </div>
      </div>
    </>
  );
}

const playerImageSrc = (play: Play) => {
  switch (play.sport) {
    case "NHL":
      return `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${play.player_id}.jpg`;
    case "NFL":
      return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${play.player_id}.png&h=110&w=110&scale=crop`;
    case "NBA":
      return `https://cdn.nba.com/headshots/nba/latest/1040x760/${play.player_id}.png?imwidth=104&imheight=76`;
    case "MLB":
      return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/h_1000,q_auto:best/v1/people/${play.player_id}/headshot/67/current`;
  }
};

const sportScore = (sport: Sport) => {
  switch (sport) {
    case "NHL":
      return "Goal";
    case "NFL":
      return "Touchdown";
    case "NBA":
      return "Dunk";
    case "MLB":
      return "Home run";
  }
};
