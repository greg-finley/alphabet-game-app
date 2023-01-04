import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Play, Sport } from "../types";
import { TwitterFollowButton } from "react-twitter-embed";
import TwitterIcon from "@mui/icons-material/Twitter";

dayjs.extend(relativeTime);

interface ScoreboardCardProps {
  play: Play;
}

export default function ScoreboardCard(props: ScoreboardCardProps) {
  const { play } = props;
  return (
    <Card sx={{ display: "flex", maxWidth: "500px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "left",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto", textAlign: "left" }}>
          <Typography variant="h6">
            <div className="Player-name-and-image">
              <Avatar
                src={`${play.sport}-Logo.png`}
                alt={`${play.sport} logo`}
              />
              <Avatar src={playerImageSrc(play)} alt={play.player_name} />
              {play.player_name}
            </div>
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography>{sportScore(play.sport) + "!"}</Typography>
            <a
              href={`https://twitter.com/${play.sport}AlphabetGame/status/${play.tweet_id}`}
              style={{ marginLeft: 4 }}
            >
              <TwitterIcon />
            </a>
          </div>
          <Typography>{dayjs().to(dayjs.unix(play.completed_at))}</Typography>
          <Typography>
            His name has the letter
            {play.matching_letters.length === 1 ? "" : "s"}{" "}
            {play.matching_letters.join(", ")}.
          </Typography>
          <Typography>Next letter: {play.next_letter}.</Typography>
          <Typography>
            Cycled {play.times_cycled} times {play.season_phrase}.
          </Typography>
          <TwitterFollowButton
            screenName={`${play.sport}AlphabetGame`}
            options={{ showCount: false }}
          />
        </CardContent>
      </Box>
    </Card>
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
