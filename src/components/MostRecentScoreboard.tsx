import * as React from "react";
import { Play, sports } from "../types";
import ScoreboardCard from "./ScoreboardCard";
import styles from "./MostRecentScoreboard.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";

interface MostRecentScoresProps {
  plays: Play[];
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { plays } = props;
  const [items, setItems] = React.useState(
    plays.slice(0, 6).map((play, i) => <ScoreboardCard play={play} key={i} />)
  );

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
          paddingBottom: "2px",
        }}
      >
        {sports.map((sport) => (
          <Button
            sx={{
              backgroundColor: "currentColor",
              width: "250%",
              height: "100%",
              border: "2px solid #676b72",
              borderRadius: "4px",
            }}
            key={sport}
            onClick={() => {
              console.log(sport);
              // Change the background color, filter the plays to add or remove that sport
              // By default, include all sports
              // OR ... make them different tabs and you can only have one open at a time (see all the NHL scores only, etc.)
            }}
          >
            <Avatar src={`${sport}.jpeg`} alt={`${sport} logo`} />
          </Button>
        ))}
      </Box>
      <div className={styles.grid}>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
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
