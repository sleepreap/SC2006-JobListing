import { useJobsContext } from "../hooks/useJobsContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const JobListingDetails = ({ jobs }) => {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/jobList/" + jobs._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
      <div>
        <button>
          <Link to="/uploadresume">Upload Resume</Link>
        </button>
      </div>
    </div>
  );
};
export default JobListingDetails;
