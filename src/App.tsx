import React, { useEffect, useReducer } from "react";
import ReactGA from "react-ga4";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Data from "./pages/Data";
import About from "./pages/About";
import OnTwitter from "./pages/OnTwitter";
import { Play, sports, State } from "./types";

type Action =
  | { type: "FETCH_SUCCESS"; payload: Play[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = { type: "loading" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { type: "success", plays: action.payload };
    case "FETCH_ERROR":
      return { type: "error", error: action.payload };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Pass a placeholder ts to avoid caching
    const ms = new Date().getTime();
    fetch(
      "https://storage.googleapis.com/greg-finley-public/alphabet-data.json" +
        "?ts=" +
        ms
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
        dispatch({ type: "FETCH_SUCCESS", payload: plays });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      });
  }, []);

  const sportsRouters = sports.map((sport) => {
    return {
      path: "/" + sport.toLowerCase(),
      element: <Home state={state} defaultSportIndex={sports.indexOf(sport)} />,
    };
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home state={state} />,
    },
    { path: "/about", element: <About /> },
    { path: "/data", element: <Data state={state} /> },
    { path: "/twitter", element: <OnTwitter /> },
    { path: "*", element: <div>Not Found</div> },
    ...sportsRouters,
  ]);

  ReactGA.initialize("G-8MTY2HPTR0");
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
