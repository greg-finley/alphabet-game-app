export const sports = ["NHL", "NBA", "NFL", "MLB"] as const;
export type Sport = typeof sports[number];

export interface Play {
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
  sport: Sport;
  times_cycled: number;
  tweet_id: string;
  tweet_text: string;
}

export interface NewSeason {
  seasonPhrase: string;
}

export interface NewCycle {
  timesCycled: number;
  seasonPhrase: string;
}

export type State =
  | { type: "loading" }
  | { type: "error"; error: string }
  | { type: "success"; plays: Play[] };
