export const sports = ["NHL", "NBA", "NFL", "MLB"] as const;
export type Sport = typeof sports[number];

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

// Can be used for making a scoreboard card on demand
export interface PlayLite {
  player_name: string;
  sport: Sport;
  matching_letters: string[];
  next_letter: string;
  times_cycled: number;
  completed_at: number;
  season_phrase: string;
  tweet_id: string;
  player_id: number;
}

// This is the full payload we get the from the API
export interface Play extends PlayLite {
  game_id: string;
  letter_match: boolean;
  play_id: string;
  score: string;
  season_period: string;
  tweet_text: string;
}

export type State =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "success"; plays: Play[] };
