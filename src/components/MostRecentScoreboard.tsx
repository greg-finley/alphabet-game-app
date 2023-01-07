import * as React from "react";
import { Play, sports, State } from "../types";
import ScoreboardCard from "./ScoreboardCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ErrorMessage from "./ErrorMessage";

interface MostRecentScoresProps {
  state: State;
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { state } = props;

  const [sportIndex, setSportIndex] = React.useState(0);

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setSportIndex(newValue);
  };

  return (
    <div>
      <Tabs
        value={sportIndex}
        onChange={handleTabClick}
        centered
        sx={{
          maxWidth: "500px",
        }}
      >
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

  const [items, setItems] = React.useState(
    [] as React.ReactElement<typeof ScoreboardCard>[]
  );

  const fetchData = () => {
    setItems(
      items.concat(
        sportPlays
          .slice(items.length, items.length + 6)
          .map((play, i) => (
            <ScoreboardCard
              play={play}
              key={sportIndex + "_" + i + items.length}
            />
          ))
      )
    );
  };

  React.useEffect(() => {
    setItems(
      sportPlays
        .slice(0, 6)
        .map((play, i) => (
          <ScoreboardCard play={play} key={sportIndex + "_" + i} />
        ))
    );
    // don't add sportsPlay else infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportIndex]);

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
