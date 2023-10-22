import { useState, useEffect } from "react";

const ResumeSubmissions = () => {
  const [pdfFiles, setPdfFiles] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const response = await fetch("/files");
      const json = await response.json();
      console.log(json);
      setPdfFiles(json); // Update the state with the JSON data
    } catch (error) {
      console.error("Error fetching Resumes:", error);
    }
  };

  return (
    <div>
      <h1>Resume Submissions:</h1>
      {pdfFiles &&
        pdfFiles.map((file) => (
          <div key={file.filename}>
            <h4>{file.filename}</h4>
            <p>
              <strong>Upload Date:</strong> {file.uploadDate}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ResumeSubmissions;
