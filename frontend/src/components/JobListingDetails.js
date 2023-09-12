import { useJobsContext } from "../hooks/useJobsContext";
import { Link } from "react-router-dom";
const JobListingDetails = ({ jobs }) => {
  const { dispatch } = useJobsContext();

  const handleClick = async () => {
    const response = await fetch("/jobList/" + jobs._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_JOBLISTING", payload: json });
    }
    if (!response.ok) {
      console.log("error");
    }
  };

  return (
    <div className="joblisting-details">
      <Link to={`/joblisting/${jobs._id}`}>
        <h4>{jobs.title}</h4>
      </Link>

      <p>
        <strong>Type:</strong> {jobs.type}
      </p>
      <p>
        <strong>Location:</strong> {jobs.location}
      </p>
      <p>
        <strong>Description:</strong> {jobs.description}
      </p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};
export default JobListingDetails;
