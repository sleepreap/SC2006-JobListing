import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ResumeForm = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  return <h1>Resume upload</h1>;
};

export default ResumeForm;
