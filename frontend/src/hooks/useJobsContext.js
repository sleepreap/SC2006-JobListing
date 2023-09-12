import { JobListingContext } from "../context/JobListingContext";
import { useContext } from "react";

export const useJobsContext = () => {
  const context = useContext(JobListingContext);

  if (!context) {
    throw Error(
      "useJobsContext can only be used inside useJobsContextProvider"
    );
  }

  return context;
};
