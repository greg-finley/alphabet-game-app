import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Play, Sport } from "../types";
import TwitterIcon from "@mui/icons-material/Twitter";
import ScoreBox from "./ScoreBox";

dayjs.extend(relativeTime);

interface ScoreboardCardProps {
  play: Play;
}

export default function ScoreboardCard(props: ScoreboardCardProps) {
  const { play } = props;
  return (
    <Card
      sx={{
        backgroundColor: "#97929c",
        color: "white",
        border: "1px solid black",
        marginBottom: "0.5rem",
        aspectRatio: "1.91/1",
      }}
    >
      <CardContent>
        <div className="flex-parent-element">
          <div className="flex-child-element">
            <img
              style={{
                width: "6rem",
                height: "6rem",
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
          <div className="flex-child-element">
            <div>
              <PlayerNameTextBox name={play.player_name} />
            </div>
            <div style={{ paddingBottom: "0.2rem" }}>
              <TextBox
                text={[
                  "His name has the letter" +
                    (play.matching_letters.length === 1 ? "" : "s"),
                ]}
              />
            </div>
            <div className="Centered">
              <ScoreBox
                str={play.matching_letters.join("")}
                padWithUnderscores={true}
              />
            </div>
            <div style={{ paddingBottom: "0.2rem" }}>
              <TextBox text={["Next letter in the Alphabet Game"]} />
            </div>
            <div className="Centered">
              <ScoreBox str={play.next_letter} padWithUnderscores={false} />
            </div>
            <TextBox
              text={[
                sportScore(play.sport) + "!",
                dayjs().to(dayjs.unix(play.completed_at)),
                play.times_cycled.toString() + " cycles " + play.season_phrase,
              ]}
            />
            <div
              style={{
                marginTop: "0.5rem",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <a
                href={`https://twitter.com/${play.sport}AlphabetGame/status/${play.tweet_id}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              >
                <TwitterIcon />
                <div>{`@${play.sport}AlphabetGame`}</div>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PlayerNameTextBoxProps {
  name: string;
}

const PlayerNameTextBox = (props: PlayerNameTextBoxProps) => {
  const { name } = props;
  return (
    <div
      style={{
        WebkitTextSizeAdjust: "100%",
        textAlign: "center",
        fontWeight: 300,
        fontFamily: "Verdana,sans-serif",
        fontSize: "1.4rem",
        lineHeight: "1.4rem",
        marginTop: "0.7rem",
      }}
    >
      {name}
    </div>
  );
};

interface TextBoxProps {
  text: string[];
}

const TextBox = (props: TextBoxProps) => {
  const { text } = props;
  return (
    <div
      style={{
        maxWidth: "100%",
        display: "inline-block",
        WebkitTextSizeAdjust: "100%",
        textAlign: "center",
        boxSizing: "border-box",
        fontWeight: 300,
        color: "#f9bc32",
        fontFamily: "Verdana,sans-serif",
        fontSize: "0.8rem",
        lineHeight: "0.8rem",
        backgroundColor: "#00000066",
        padding: "0.3rem",
        borderRadius: "0.3rem",
        marginTop: "0.3rem",
        whiteSpace: "pre-wrap",
      }}
    >
      {text.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

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
