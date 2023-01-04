import React from "react";
import Contact from "../components/Contact";
import GitHubLinks from "../components/GitHubLinks";
import SimpleAccordion from "../components/SimpleAccordion";
import TopAppBar from "../components/TopAppBar";
import ReactGA from "react-ga4";

export default function About() {
  ReactGA.event({
    category: "User",
    action: "Visited About page",
  });

  return (
    <>
      <TopAppBar />
      <div className="App-container">
        <SimpleAccordion
          defaultExpanded={true}
          title={"Source Code"}
          content={<GitHubLinks />}
        />
        <SimpleAccordion
          defaultExpanded={true}
          title={"Contact"}
          content={<Contact />}
        />
      </div>
    </>
  );
}
