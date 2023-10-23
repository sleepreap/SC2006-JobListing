import { useState } from "react";
import axios from "axios";

const ResumeForm = () => {
  const [fileName, setFileName] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [pdfFiles, setPdfFiles] = useState(null);
  // const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("filename", fileName);
    formData.append("employername", employerName);
    formData.append("file", pdfFiles);
    // console.log(fileName, employerName, pdfFiles);
    await axios.post("http://localhost:4000/uploadresume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(result);
  };

  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitForm}>
        <h4>Upload Resume</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="File Name"
          required
          onChange={(e) => setFileName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Employer Name"
          required
          onChange={(e) => setEmployerName(e.target.value)}
        />
        <br />
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setPdfFiles(e.target.files[0])}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResumeForm;
