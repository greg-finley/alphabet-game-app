import React, { useEffect, useState } from "react";
import "./App.css";
import Contact from "./components/Contact";
import ErrorMessage from "./components/ErrorMessage";
import GitHubLinks from "./components/GitHubLinks";
import LoadingCircle from "./components/LoadingCircle";
import MostRecentScoreboard from "./components/MostRecentScoreboard";
import SimpleAccordion from "./components/SimpleAccordion";
import TopAppBar from "./components/TopAppBar";
import { Play } from "./types";

function App() {
  const [plays, setPlays] = useState<null | Play[]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch(
      `https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?matches_only=true&limit=0`
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
        setPlays(plays);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setPlays(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <TopAppBar />
      <header className="App-header">
        <p className="App-text-intro">
          Let's play the Alphabet Game, looking for the next letter in player
          names as they hit MLB home runs, score NHL goals, dunk in the NBA, and
          score NFL touchdowns.
        </p>
        <SimpleAccordion
          defaultExpanded={true}
          title={"Most Recent Scores"}
          content={
            <div>
              {loading ? (
                <LoadingCircle />
              ) : error ? (
                <ErrorMessage error={error} />
              ) : (
                plays && <MostRecentScoreboard plays={plays} />
              )}
            </div>
          }
        />
        <SimpleAccordion
          defaultExpanded={false}
          title={"All Scores"}
          content={<p className="App-text">Coming soon</p>}
        />
        <SimpleAccordion
          defaultExpanded={false}
          title={"Source Code"}
          content={<GitHubLinks />}
        />
        <SimpleAccordion
          defaultExpanded={true}
          title={"Contact"}
          content={<Contact />}
        />
      </header>
    </div>
  );
}

export default App;
