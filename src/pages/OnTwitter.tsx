import React from "react";
import TopAppBar from "../components/TopAppBar";
import ReactGA from "react-ga4";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import LoadingCircle from "../components/LoadingCircle";
import { ScrollRestoration } from "react-router-dom";
import { sports } from "../types";

export default function OnTwitter() {
  ReactGA.event({
    category: "User",
    action: "Visited On Twitter page",
  });

  return (
    <>
      <ScrollRestoration />
      <TopAppBar />
      <div className="App-container">
        <p className="App-text-other-pages">
          The Sports Alphabet Game is played on Twitter. Check out the accounts
          below.
        </p>
        {sports.map((screenName) => (
          <div style={{ padding: "10px" }} key={screenName}>
            <TwitterTimelineEmbed
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
