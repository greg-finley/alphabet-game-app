import React, { useEffect, useState } from 'react';
import './App.css';

interface TweetablePlay {
  // {
  //   "completed_at": 1665941777,
  //   "game_id": "401437783",
  //   "letter_match": true,
  //   "matching_letters": [
  //       "X"
  //   ],
  //   "next_letter": "Y",
  //   "play_id": "401437783960",
  //   "player_id": 3116385,
  //   "player_name": "Joe Mixon",
  //   "score": "CIN (7) @ NO (7) 1st 0:45",
  //   "season_period": "season",
  //   "season_phrase": "in the 2022 season",
  //   "sport": "NFL",
  //   "times_cycled": 0,
  //   "tweet_id": "1581700562185117696",
  //   "tweet_text": "Joe Mixon just scored a touchdown! #RuleTheJungle  His name has the letter X. The next letter in the Touchdown Alphabet Game is now Y.  We have cycled through the alphabet 0 times since Week 5.  CIN (7) @ NO (7) 1st 0:45"
  completed_at: number;
  game_id: string;
  letter_match: boolean;
  matching_letters: string[];
  next_letter: string;
  play_id: string;
  player_id: number;
  player_name: string;
  score: string;
  season_period: string;
  season_phrase: string;
  sport: string;
  times_cycled: number;
  tweet_id: string;
  tweet_text: string;
}

function App() {
  const [data, setData] = useState<null | TweetablePlay[]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  
  useEffect(() => {
    fetch(`https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?matches_only=true&limit=0`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        } 
        return response.json().then((x => x.data)) as Promise<TweetablePlay[]>;
      })
      .then((actualData) => {
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

        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <div>A moment please...</div>}
        {data && <><div>{data.slice(0, 5).map((x) => x.player_name).join(" ")}</div></>}
        {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      </header>
    </div>
  );
}

export default App;
