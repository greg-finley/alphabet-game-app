import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
        display: "flex",
        maxWidth: "500px",
        backgroundColor: "#97929c",
        color: "white",
        border: "1px solid black",
        marginBottom: "0.5rem",
      }}
    >
      <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
        <div className="Centered">
          <Avatar
            src={playerImageSrc(play)}
            alt={play.player_name}
            sx={{ bgcolor: "white" }}
          >
            {/* Fallback image */}
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src="https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&h=110&w=110&scale=crop"
              alt={play.player_name}
            />
          </Avatar>
        </div>
        <div className="Centered">
          <TextBox text={[play.player_name]} />
        </div>
        <div className="Centered">
          <Typography>{sportScore(play.sport) + "!"}</Typography>
        </div>
        <Typography>{dayjs().to(dayjs.unix(play.completed_at))}</Typography>
        <Typography>
          His name has the letter
          {play.matching_letters.length === 1 ? "" : "s"} :
        </Typography>
        <ScoreBox
          str={play.matching_letters.join("")}
          padWithUnderscores={true}
        />
        <Typography>Next letter:</Typography>
        <ScoreBox str={play.next_letter} padWithUnderscores={false} />
        <Typography>Cycles {play.season_phrase}:</Typography>
        <ScoreBox
          str={play.times_cycled.toString()}
          padWithUnderscores={false}
        />
        <a
          href={`https://twitter.com/${play.sport}AlphabetGame/status/${play.tweet_id}`}
          style={{ marginLeft: 4 }}
        >
          <TwitterIcon />
        </a>
      </CardContent>
    </Card>
  );
}

interface TextBoxProps {
  text: string[];
}

const TextBox = (props: TextBoxProps) => {
  const { text } = props;
  return (
    <div
      style={{
        WebkitTextSizeAdjust: "100%",
        textAlign: "center",
        boxSizing: "border-box",
        fontWeight: 300,
        color: "#f9bc32",
        fontFamily: "Verdana,sans-serif",
        fontSize: "1.4rem",
        lineHeight: "1.4rem",
        backgroundColor: "#00000066",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        marginTop: "0.5rem",
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
