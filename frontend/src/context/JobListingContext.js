import { createContext, useReducer } from "react";

export const JobListingContext = createContext();

export const jobReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOBLISTINGS":
      return {
        jobs: action.payload,
      };
    case "CREATE_JOBLISTING":
      return {
        jobs: [action.payload, ...state.jobs],
      };
    case "DELETE_JOBLISTING":
      return {
        jobs: state.jobs.filter((j) => j._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const JobListingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, { jobs: [] });

  return (
    <JobListingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobListingContext.Provider>
  );
};
