import * as React from "react";
import { Play, sports, State } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "./LoadingCircle";
import { Avatar } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ErrorMessage from "./ErrorMessage";
import ReactGA from "react-ga4";
import ScrollToTop from "react-scroll-to-top";
import BaseCard from "./BaseCard";
import { BaseCardContent } from "../types";

interface MostRecentScoresProps {
  state: State;
  defaultSportIndex: number;
  customPlay: Play | undefined;
}

function MostRecentScoreboard(props: MostRecentScoresProps) {
  const { state, defaultSportIndex, customPlay } = props;

  const [sportIndex, setSportIndex] = React.useState(defaultSportIndex);

  const handleTabClick = (event: React.SyntheticEvent, newValue: number) => {
    ReactGA.event({
      category: "User",
      action: `Clicked ${sports[newValue]} tab`,
    });
    setSportIndex(newValue);
  };

  return (
    <div>
      <ScrollToTopWithTrack />
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
      ) : customPlay ? (
        <Scores
          plays={[customPlay]}
          sportIndex={sports.indexOf(customPlay.sport)}
          customPlay={customPlay}
        />
      ) : (
        <Scores plays={state.plays} sportIndex={sportIndex} />
      )}
    </div>
  );
}

interface ScoresProps {
  plays: Play[];
  sportIndex: number;
  customPlay?: Play;
}

function Scores(props: ScoresProps) {
  const { plays, sportIndex, customPlay } = props;

  const cardContents: BaseCardContent[] = [];
  const sportPlays = plays.filter((play) => play.sport === sports[sportIndex]);

  sportPlays.forEach((play, i) => {
    const formattedPlay = {
      play,
      customCard: !!customPlay,
    };
    const nextPlay: Play | undefined = sportPlays[i + 1];
    // If there is no next play, we should report being at the begining of the season
    // If the next play is in a different season, we should report being at the begining of the season
    if (!nextPlay || nextPlay.season_phrase !== play.season_phrase) {
      cardContents.push(
        ...[formattedPlay, { seasonPhrase: play.season_phrase }]
      );
      return;
    }
    // If times cycled has increased, we should report it
    if (nextPlay.times_cycled !== play.times_cycled) {
      cardContents.push(
        ...[
          {
            timesCycled: play.times_cycled,
            seasonPhrase: play.season_phrase,
          },
          formattedPlay,
        ]
      );
      return;
    }
    // Otherwise, we should just report the play
    cardContents.push(formattedPlay);
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
    ReactGA.event({
      category: "User",
      action: `Fetched more items for ${sports[sportIndex]}`,
    });
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
  ) : (
    <></>
  );
}

function ScrollToTopWithTrack() {
  return (
    <div
      onClick={() => {
        ReactGA.event({
          category: "User",
          action: "Clicked scroll to top button",
        });
      }}
    >
      <ScrollToTop
        smooth
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
}

export default MostRecentScoreboard;
