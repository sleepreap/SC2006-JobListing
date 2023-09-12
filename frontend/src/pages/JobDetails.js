import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useEffect and useState

const JobDetails = () => {
  const { id } = useParams();

  // Declare a state variable to store the JSON data
  const [jobData, setJobData] = useState(null);

  // Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    const fetchJobListing = async () => {
      try {
        const response = await fetch("/joblist/" + id);
        const json = await response.json();
        setJobData(json); // Update the state with the JSON data
      } catch (error) {
        console.error("Error fetching job listing:", error);
      }
    };
    fetchJobListing();
  }, [id]); // Include id as a dependency to fetch data when it changes

  return (
    <div className="jobdetail">
      {jobData && (
        <>
          <h4>{jobData.title}</h4>
          <p>
            <strong>Type:</strong> {jobData.type}
          </p>
          <p>
            <strong>Location:</strong> {jobData.location}
          </p>
          <p>
            <strong>Description:</strong> {jobData.description}
          </p>
        </>
      )}
    </div>
  );
};

export default JobDetails;
