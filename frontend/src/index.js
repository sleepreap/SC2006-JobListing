import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { JobListingContextProvider } from "./context/JobListingContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <JobListingContextProvider>
        <App />
      </JobListingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
