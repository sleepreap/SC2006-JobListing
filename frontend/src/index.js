import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { JobListingContextProvider } from "./context/JobListingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <JobListingContextProvider>
      <App />
    </JobListingContextProvider>
  </React.StrictMode>
);
