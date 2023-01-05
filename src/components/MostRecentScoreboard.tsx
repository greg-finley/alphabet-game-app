import * as React from "react";
import { Play } from "../types";
import ScoreboardCard from "./ScoreboardCard";
import styles from "./MostRecentScoreboard.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

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
    <div className={styles.grid}>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={items.length < plays.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}

export default MostRecentScoreboard;
