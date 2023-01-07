import * as React from "react";
import { Play, sports } from "../types";
import ScoreboardCard from "./ScoreboardCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface MostRecentScoresProps {
  plays: Play[];
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { plays } = props;
  const playsBySport = plays.reduce((acc, play) => {
    if (acc[play.sport]) {
      acc[play.sport].push(play);
    } else {
      acc[play.sport] = [play];
    }
    return acc;
  }, {} as Record<string, Play[]>);
  const [sportIndex, setSportIndex] = React.useState(0);

  const [items, setItems] = React.useState(
    (playsBySport[sports[sportIndex]] || [])
      .slice(0, 6)
      .map((play, i) => <ScoreboardCard play={play} key={i} />)
  );

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setSportIndex(newValue);
    setItems(
      (playsBySport[sports[newValue]] || [])
        .slice(0, 6)
        .map((play, i) => <ScoreboardCard play={play} key={i} />)
    );
  };

  const fetchData = () => {
    setItems(
      items.concat(
        (playsBySport[sports[sportIndex]] || [])
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
      {items.length ? (
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

export default MostRecentScoreboard;
