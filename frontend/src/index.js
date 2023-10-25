import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { JobListingContextProvider } from "./context/JobListingContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ChakraProvider, theme } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <JobListingContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </JobListingContextProvider>
  </AuthContextProvider>
);
