import * as React from "react";
import { Play, sports, State } from "../types";
import ScoreboardCard from "./ScoreboardCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import ErrorMessage from "../components/ErrorMessage";
import { Avatar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface MostRecentScoresProps {
  state: State;
}

export default function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { state } = props;
  const plays = state.type === "success" ? state.plays : [];

  const playsBySport = plays.reduce((acc, play) => {
    if (acc[play.sport]) {
      acc[play.sport].push(play);
    } else {
      acc[play.sport] = [play];
    }
    return acc;
  }, {} as Record<string, Play[]>);

  const [items, setItems] = React.useState(
    (playsBySport[sports[0]] || [])
      .slice(0, 6)
      .map((play, i) => <ScoreboardCard play={play} key={i} />)
  );
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setItems(
      (playsBySport[sports[newValue]] || [])
        .slice(0, 6)
        .map((play, i) => <ScoreboardCard play={play} key={i} />)
    );
  };

  const fetchData = () => {
    setItems(
      items.concat(
        plays
          .slice(items.length, items.length + 6)
          .map((play, i) => (
            <ScoreboardCard play={play} key={i + items.length} />
          ))
      )
    );
  };

  return (
    <div>
      <Tabs
        value={tabIndex}
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
              backgroundColor: tabIndex === index ? "currentColor" : "#676b72",
              border: "1px solid black",
            }}
          />
        ))}
      </Tabs>
      {state.type === "loading" ? (
        <LoadingCircle />
      ) : state.type === "error" ? (
        <ErrorMessage error={state.error} />
      ) : items.length ? (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={items.length < plays.length}
          loader={<LoadingCircle />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items}
        </InfiniteScroll>
      ) : (
        <p style={{ textAlign: "center" }}>
          <b>See you when spring training starts!</b>
        </p>
      )}
    </div>
  );
}
