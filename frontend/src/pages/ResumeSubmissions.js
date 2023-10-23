import { useState, useEffect } from "react";
import axios from "axios";
import { useJobsContext } from "../hooks/useJobsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ResumeSubmissions = () => {
  const [pdfFiles, setPdfFiles] = useState(null);
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
      console.log("json:", json);
      if (response.ok) {
        dispatch({ type: "SET_JOBLISTINGS", payload: json });
      }
    };
    if (user) {
      fetchJobListing();
      getPdf();
    }
  }, [dispatch, user]);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:4000/resumes");
      console.log(result.data);
      setPdfFiles(result.data);
    } catch (error) {
      console.error("Error fetching Resumes:", error);
    }
  };
  const showPdf = (pdf) => {
    window.open(`http://localhost:4000/files/${pdf}`, "_blank", "noreferrer");
  };

  return (
    <div>
      <h1>Resume Submissions:</h1>
      {jobs &&
        jobs.map((job) => (
          <div key={job._id}>
            <h4>{job.description}</h4>
            {pdfFiles &&
              pdfFiles
                .filter((file) => file.employername === job.description)
                .map((file) => (
                  <div key={file.filename}>
                    <h4>{file.filename}</h4>
                    <button onClick={() => showPdf(file.filename)}>
                      Show Resume
                    </button>
                  </div>
                ))}
          </div>
        ))}
    </div>
  );
};

export default ResumeSubmissions;
