import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import LoadingCircle from "./components/LoadingCircle";
import SimpleAccordion from "./components/SimpleAccordion";
import TopAppBar from "./components/TopAppBar";
import { MostRecentScores, Play } from "./types";

function App() {
  // const [plays, setPlays] = useState<null | Play[]>(null);
  const [mostRecentScores, setMostRecentScores] =
    useState<null | MostRecentScores>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch(
      `https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?matches_only=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json().then((x) => x.data) as Promise<Play[]>;
      })
      .then((plays) => {
        // const countSports = actualData.data.reduce((acc, x) => {
        //   if (acc[x.sport]) {
        //     acc[x.sport] += 1;
        //   } else {
        //     acc[x.sport] = 1;
        //   }
        //   return acc;
        // }, {} as Record<string, number>);
        // console.log(actualData.data.length);
        // console.log(countSports);

        // setPlays(plays);
        setMostRecentScores(
          plays.reduce((acc, x) => {
            // Only keep the first play for each sport
            if (!acc[x.sport]) {
              acc[x.sport] = x;
            }
            return acc;
          }, {} as MostRecentScores)
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setMostRecentScores(null);
        // setPlays(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <TopAppBar />
      <header className="App-header">
        <p className="App-text">
          Let's play the Alphabet Game, looking for the next letter in player
          names as they hit MLB home runs, score NHL goals, dunk in the NBA, and
          score NFL touchdowns.
        </p>
        <SimpleAccordion
          defaultExpanded={true}
          title={"Most Recent Scores"}
          content={<Typography color={"white"}>Nothing yet</Typography>}
        />
        {loading && <LoadingCircle />}
        {mostRecentScores && (
          <>
            <div>
              {Object.values(mostRecentScores).map((x) => playerImage(x))}
            </div>
          </>
        )}
        <div>
          {/* {plays && <><div>{plays.slice(0, 10).map((x) => playerImage(x))}</div></>}*/}
        </div>
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
      </header>
    </div>
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
      <img className="Player-image" src={src} alt={play.player_name} />
      <div>{play.next_letter}</div>
      <div>{play.matching_letters}</div>
      <div>{play.times_cycled}</div>
      <div>{play.completed_at}</div>
    </div>
  );
};

export default App;
