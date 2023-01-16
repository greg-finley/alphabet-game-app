export const sports = ["NHL", "NBA", "NFL", "MLB"] as const;
export type Sport = typeof sports[number];

export interface Play {
  // {
  //   "completed_at": 1665941777,
  //   "matching_letters": [
  //       "X"
  //   ],
  //   "next_letter": "Y",
  //   "player_id": 3116385,
  //   "player_name": "Joe Mixon",
  //   "season_phrase": "in the 2022 season",
  //   "sport": "NFL",
  //   "times_cycled": 0,
  //   "tweet_id": "1581700562185117696",
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
