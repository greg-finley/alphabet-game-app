import React from "react";
import Contact from "../components/Contact";
import GitHubLinks from "../components/GitHubLinks";
import TopAppBar from "../components/TopAppBar";
import ReactGA from "react-ga4";
import { ScrollRestoration } from "react-router-dom";
import styles from "./About.module.css";

export default function About() {
  ReactGA.event({
    category: "User",
    action: "Visited About page",
  });

  return (
    <>
      <ScrollRestoration />
      <TopAppBar />
      <div className="App-container">
        <div className={styles.aboutContainer}>
          <h4 style={{ textAlign: "left" }}>Source Code</h4>
          <GitHubLinks />
          <h4 style={{ textAlign: "left" }}>Contact</h4>
          <Contact />
        </div>
      </div>
    </>
  );
}
