import { useEffect } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import JobListingDetails from "../components/JobListingDetails";

const Home = () => {
  const { jobs, dispatch } = useJobsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchJobListing = async () => {
      const response = await fetch("/joblist/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_JOBLISTINGS", payload: json });
      }
    };
    if (user) {
      fetchJobListing();
    }
  }, [dispatch, user]);

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
