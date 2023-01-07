import * as React from "react";
import { Play, sports } from "../types";
import ScoreboardCard from "./ScoreboardCard";
import styles from "./MostRecentScoreboard.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface MostRecentScoresProps {
  plays: Play[];
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { plays } = props;
  const [items, setItems] = React.useState(
    plays.slice(0, 6).map((play, i) => <ScoreboardCard play={play} key={i} />)
  );
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tabIndex} onChange={handleTabClick} centered>
          {sports.map((sport) => (
            <Tab
              icon={<Avatar src={`${sport}.jpeg`} />}
              label={sport}
              key={sport}
            />
          ))}
        </Tabs>
      </Box>

      <div className={styles.grid}>
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
      </div>
    </>
  );
}

export default MostRecentScoreboard;
