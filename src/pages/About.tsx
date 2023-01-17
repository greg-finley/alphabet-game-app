import React from "react";
import Contact from "../components/Contact";
import GitHubLinks from "../components/GitHubLinks";
import TopAppBar from "../components/TopAppBar";
import ReactGA from "react-ga4";
import { ScrollRestoration } from "react-router-dom";
import styles from "./About.module.css";

function Coffee() {
  return (
    <a
      className="buyButton"
      target="_blank"
      href="https://www.buymeacoffee.com/gregfinley"
      rel="noreferrer"
    >
      <img
        className="coffeeImage"
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span className="coffeeButtonText">Buy me a coffee</span>
    </a>
  );
}

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
          <h4 style={{ textAlign: "left" }}>Source code</h4>
          <GitHubLinks />
          <h4 style={{ textAlign: "left" }}>Contact</h4>
          <Contact />
          <h4 style={{ textAlign: "left" }}>Buy me a coffee</h4>
          <Coffee />
        </div>
      </div>
    </>
  );
}
