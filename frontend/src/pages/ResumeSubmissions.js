import { useState, useEffect } from "react";
import axios from "axios";
const ResumeSubmissions = () => {
  const [pdfFiles, setPdfFiles] = useState(null);
  //const [error, setError] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

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
      {pdfFiles &&
        pdfFiles.map((file) => (
          <div key={file.filename}>
            <h4>{file.filename}</h4>
            <button onClick={() => showPdf(file.filename)}>Show Resume</button>
          </div>
        ))}
    </div>
  );
};

export default ResumeSubmissions;
