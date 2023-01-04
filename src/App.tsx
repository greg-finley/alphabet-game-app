import React from "react";
import ReactGA from "react-ga4";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Data from "./pages/Data";
import About from "./pages/About";
import OnTwitter from "./pages/OnTwitter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/about", element: <About /> },
  { path: "/data", element: <Data /> },
  { path: "/twitter", element: <OnTwitter /> },
  { path: "*", element: <div>Not Found</div> },
]);

function App() {
  ReactGA.initialize("G-8MTY2HPTR0");
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
