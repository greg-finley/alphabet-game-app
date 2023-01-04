import React from "react";
import TopAppBar from "../components/TopAppBar";
import ReactGA from "react-ga4";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import LoadingCircle from "../components/LoadingCircle";

export default function OnTwitter() {
  ReactGA.event({
    category: "User",
    action: "Visited On Twitter page",
  });

  const screenNames = ["NHL", "NBA", "NFL", "MLB"];

  return (
    <>
      <TopAppBar />
      <div className="App-container">
        <p className="App-text-intro">
          The Sports Alphabet Game is played on Twitter. Check out the accounts
          below.
        </p>
        {screenNames.map((screenName) => (
          <div style={{ padding: "10px" }}>
            <TwitterTimelineEmbed
              key={screenName}
              sourceType="profile"
              screenName={`${screenName}AlphabetGame`}
              options={{ height: 200 }}
              placeholder={<LoadingCircle />}
            />
          </div>
        ))}
      </div>
    </>
  );
}
