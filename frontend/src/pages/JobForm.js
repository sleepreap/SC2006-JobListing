import { useState } from "react";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const JobForm = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const job = { title, type, location, description };

    const response = await fetch("/joblist", {
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log(json.error); // Log the JSON response
      console.log(error);
    }
    if (response.ok) {
      setTitle("");
      setType("");
      setLocation("");
      setDescription("");
      setError(null);
      dispatch({ type: "CREATE_JOBLISTING", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new Job Listing</h3>
      <label>Job Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>

      <label>Job Type:</label>
      <input
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={type}
      ></input>

      <label>Job Location:</label>
      <input
        type="number"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      ></input>
      <label>Job Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <button>Submit Job Listing</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default JobForm;
