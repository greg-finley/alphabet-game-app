import React from "react";
import Contact from "../components/Contact";
import GitHubLinks from "../components/GitHubLinks";
import SimpleAccordion from "../components/SimpleAccordion";
import TopAppBar from "../components/TopAppBar";
import ReactGA from "react-ga4";

export default function About() {
  ReactGA.initialize("G-8MTY2HPTR0");
  ReactGA.event({
    category: "User",
    action: "Visited about page",
  });

  return (
    <>
      <TopAppBar />
      <header className="App-header">
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
      </header>
    </>
  );
}
