import * as React from "react";
import { Play, sports, State } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ErrorMessage from "./ErrorMessage";
import ReactGA from "react-ga4";
import BaseCard from "./BaseCard";

type Item = React.ReactElement<typeof BaseCard>;

interface MostRecentScoresProps {
  state: State;
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { state } = props;

  const [sportIndex, setSportIndex] = React.useState(0);

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    ReactGA.event({
      category: "User",
      action: `Clicked ${sports[newValue]} tab`,
    });
    setSportIndex(newValue);
  };

  return (
    <div>
      <Tabs value={sportIndex} onChange={handleTabClick} centered>
        {sports.map((sport, index) => (
          <Tab
            icon={<Avatar src={`${sport}.jpeg`} variant="square" />}
            key={sport}
            sx={{
              backgroundColor:
                sportIndex === index ? "currentColor" : "#676b72",
              border: "1px solid black",
            }}
          />
        ))}
      </Tabs>
      {state.type === "loading" ? (
        <LoadingCircle />
      ) : state.type === "error" ? (
        <ErrorMessage error={state.error} />
      ) : (
        <Scores plays={state.plays} sportIndex={sportIndex} />
      )}
    </div>
  );
}

interface ScoresProps {
  plays: Play[];
  sportIndex: number;
}

function Scores(props: ScoresProps) {
  const { plays, sportIndex } = props;

  const sportPlays = plays.filter((play) => play.sport === sports[sportIndex]);

  const [items, setItems] = React.useState([] as Item[]);
  const [currentSeasonPhrase, setCurrentSeasonPhrase] = React.useState<
    string | undefined
  >(undefined);
  const [timesCycled, setTimesCycled] = React.useState<number | undefined>(
    undefined
  );

  React.useEffect(() => {
    setItems(playsToItems(sportPlays.slice(0, 5), true));
    // don't add sportsPlay else infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportIndex]);

  const playsToItems = (plays: Play[], initial?: boolean): Item[] => {
    const items: Item[] = [];

    plays.forEach((play, i) => {
      const playCard = (
        <BaseCard content={play} key={sportIndex + "_" + i + items.length} />
      );

      if (i === 0 && initial) {
        setCurrentSeasonPhrase(sportPlays[0].season_phrase);
        setTimesCycled(sportPlays[0].times_cycled);
        items.push(playCard);
        return;
      } else if (play.season_phrase !== currentSeasonPhrase) {
        // TODO: Put a card _after_ the play card saying we're in a new season
        setCurrentSeasonPhrase(play.season_phrase);
        setTimesCycled(0);
        items.push(playCard);
        return;
      } else if (play.times_cycled !== timesCycled) {
        // This is the second else so we don't put a card saying we now have 0 cycles
        // TODO: Put a card before (?) the play card saying we've done a new cycle
        setTimesCycled(play.times_cycled);
        items.push(playCard);
        return;
      }
      items.push(playCard);
    });

    return items;
  };

  const fetchData = () => {
    setItems(
      items.concat(
        playsToItems(sportPlays.slice(items.length, items.length + 5))
      )
    );
  };

  return items.length ? (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={items.length < sportPlays.length}
      loader={<LoadingCircle />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items}
    </InfiniteScroll>
  ) : // Don't flicker the message; this can be removed once MLB has plays
  sports[sportIndex] === "MLB" ? (
    <p style={{ textAlign: "center" }}>
      <b>See you when spring training starts!</b>
    </p>
  ) : (
    <></>
  );
}

export default MostRecentScoreboard;
