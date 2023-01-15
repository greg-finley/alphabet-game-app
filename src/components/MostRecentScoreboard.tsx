import * as React from "react";
import { NewSeason, NewCycle, Play, sports, State } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ErrorMessage from "./ErrorMessage";
import ReactGA from "react-ga4";
import BaseCard from "./BaseCard";

type BaseCardContent = Play | NewSeason | NewCycle;

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

  const cardContents: BaseCardContent[] = [];
  // TODO: Do we even need these? Just compare to the card coming after it?
  var currentSeasonPhrase = "";
  var timesCycled = 0;
  plays
    .filter((play) => play.sport === sports[sportIndex])
    .forEach((play, i) => {
      if (i === 0) {
        currentSeasonPhrase = play.season_phrase;
        timesCycled = play.times_cycled;
        cardContents.push(play);
        return;
        // TODO: Do these need to look ahead one card?
      } else if (play.season_phrase !== currentSeasonPhrase) {
        currentSeasonPhrase = play.season_phrase;
        timesCycled = 0;
        cardContents.push(...[play, { seasonPhrase: currentSeasonPhrase }]);
        return;
      } else if (play.times_cycled !== timesCycled) {
        // This is the second else so we don't put a card saying we now have 0 cycles
        timesCycled = play.times_cycled;
        cardContents.push(
          ...[
            play,
            {
              timesCycled: play.times_cycled + 1,
              seasonPhrase: currentSeasonPhrase,
            },
          ]
        );
        return;
      }
      cardContents.push(play);
    });

  const [items, setItems] = React.useState(
    [] as React.ReactElement<typeof BaseCard>[]
  );

  React.useEffect(() => {
    setItems(
      cardContents
        .slice(0, 5)
        .map((content, i) => (
          <BaseCard content={content} key={sportIndex + "_" + i} />
        ))
    );
    // don't add sportsPlay else infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportIndex]);

  const fetchData = () => {
    setItems(
      items.concat(
        cardContents
          .slice(items.length, items.length + 5)
          .map((content, i) => (
            <BaseCard
              content={content}
              key={sportIndex + "_" + i + items.length}
            />
          ))
      )
    );
  };

  return items.length ? (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={items.length < cardContents.length}
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
