import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Data from "./pages/Data";
import About from "./pages/About";
import OnTwitter from "./pages/OnTwitter";
import { Play } from "./types";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [plays, setPlays] = React.useState<Play[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://us-central1-greg-finley.cloudfunctions.net/alphabet-game-plays-api?matches_only=true&limit=0`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json().then((x) => x.data) as Promise<Play[]>;
      })
      .then((plays) => {
        setPlays(plays);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home plays={plays} />,
    },
    { path: "/about", element: <About /> },
    { path: "/data", element: <Data plays={plays} /> },
    { path: "/twitter", element: <OnTwitter /> },
    { path: "*", element: <div>Not Found</div> },
  ]);

  ReactGA.initialize("G-8MTY2HPTR0");
  return (
    <div className="App">
      {error && <ErrorMessage error={error} />}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
