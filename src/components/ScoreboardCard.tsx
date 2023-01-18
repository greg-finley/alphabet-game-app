import * as React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Play, Sport } from "../types";
import ScoreBox from "./ScoreBox";
import TextBox from "./TextBox";

dayjs.extend(relativeTime);

interface ScoreboardCardProps {
  play: Play;
  customCard?: boolean; // Card generated on the fly, to post on Twitter. If so remove the "5 minutes ago" part and put the web url at the bottom instead of the Twitter handle
}

export default function ScoreboardCard(props: ScoreboardCardProps) {
  const { play, customCard } = props;
  const matchingLetterHeadline = matchingLetterLengthToHeadline(
    play.matching_letters.length
  );
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
            !customCard ? " " : null,
            !customCard ? dayjs().to(dayjs.unix(play.completed_at)) : null,
          ]}
        />
      </div>
      <div className="score-rect">
        <div>
          <TextBox text={[play.player_name]} big={true} />
          {matchingLetterHeadline ? (
            <TextBox text={[matchingLetterHeadline]} />
          ) : null}
        </div>
        <div className="score-and-text-box box-left">
          <TextBox
            text={[
              "His name has the letter" +
                (play.matching_letters.length === 1 ? "" : "s"),
              <ScoreBox
                str={play.matching_letters.join("")}
                key={play.tweet_id + "letter"}
              />,
            ]}
          />
        </div>
        <div className="score-and-text-box box-right">
          <TextBox
            text={[
              "Next letter in the Alphabet Game",
              <ScoreBox str={play.next_letter} key={play.tweet_id + "next"} />,
            ]}
          />
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: "0.6rem",
            top: "90%",
            right: "6%",
          }}
        >
          {!customCard ? (
            <a
              href={`https://twitter.com/${play.sport}AlphabetGame/status/${play.tweet_id}`}
              style={{
                textDecoration: "none",
                color: "#f5c456",
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

const matchingLetterLengthToHeadline = (length: number) => {
  if (length <= 1) {
    return null;
  }
  if (length === 2) {
    return "DOUBLE LETTER";
  }
  if (length === 3) {
    return "TRIPLE LETTER";
  }
  if (length === 4) {
    return "QUADRUPLE LETTER";
  }
  if (length === 5) {
    return "QUINTUPLE LETTER";
  }
  if (length === 6) {
    return "SEXTUPLE LETTER";
  }
  return "MEGA LETTER";
};
