import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";

//components
import JobListingDetails from "../components/JobListingDetails";

const Home = () => {
  const { jobs, dispatch } = useJobsContext();

  useEffect(() => {
    const fetchJobListing = async () => {
      const response = await fetch("/joblist/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_JOBLISTINGS", payload: json });
      }
    };
    fetchJobListing();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="job">
        {jobs &&
          jobs.map((jobs) => <JobListingDetails key={jobs._id} jobs={jobs} />)}
      </div>
    </div>
  );
};

export default Home;
