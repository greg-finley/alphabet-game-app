import React, { useState, useEffect } from "react";
import CSV from "../components/CSV";
import { toCsv } from "react-csv-downloader";
import FileSaver from "file-saver";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle";
import TopAppBar from "../components/TopAppBar";
import { State } from "../types";
import ReactGA from "react-ga4";
import { ScrollRestoration } from "react-router-dom";

interface DataProps {
  state: State;
}

export default function Data(props: DataProps) {
  const { state } = props;
  const [isLoadingBigData, setIsLoadingBigData] = React.useState(false);
  const [bigData, setBigData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function downloadBigData() {
      if (bigData.length > 0) {
        const csv = await toCsv({
          datas: bigData,
          wrapColumnChar: '"',
        });
        const blob = new Blob([csv || ""], { type: "text/csv" });
        FileSaver.saveAs(blob, `all_scores_${new Date().getTime()}.csv`);
      }
    }
    downloadBigData();
  }, [bigData]);

  const handleBigDataClick = async () => {
    setIsLoadingBigData(true);
    setBigData(
      await fetch(
        "https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?limit=0"
      )
        .then((response) => response.json())
        .then((x) => x.data)
    );
    setIsLoadingBigData(false);
  };

  ReactGA.event({
    category: "User",
    action: "Visited data page",
  });

  return (
    <>
      <ScrollRestoration />
      <TopAppBar />
      <div className="App-container">
        <p className="App-text">
          All scores that have been tweeted are available below to download as a
          CSV. They are also available{" "}
          <a href="https://github.com/greg-finley/alphabet-game-plays-api#api">
            via an API
          </a>{" "}
          or
          <a href="https://storage.googleapis.com/greg-finley-public/alphabet-data.json">
            {" "}
            as JSON
          </a>
          .
        </p>
        <div className="download-csv-button">
          {state.type === "loading" ? (
            <LoadingCircle />
          ) : state.type === "error" ? (
            <ErrorMessage error={state.error} />
          ) : (
            <CSV
              data={state.plays}
              filename={"matching_scores"}
              title="Download matching letter plays"
            />
          )}
        </div>
        <div className="download-csv-button" onClick={handleBigDataClick}>
          {isLoadingBigData ? (
            <LoadingCircle />
          ) : (
            <button>Download all plays (multiple MB)</button>
          )}
        </div>
      </div>
    </>
  );
}
