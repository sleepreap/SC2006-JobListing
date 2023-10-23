import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//pages & component
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import JobForm from "./pages/JobForm";
import ViewMap from "./pages/ViewMap";
import JobDetails from "./pages/JobDetails";
import SignupForm from "./pages/SignupForm";
import Loginform from "./pages/LoginForm";
import { useAuthContext } from "./hooks/useAuthContext";
import ResumeForm from "./pages/ResumeForm";
import ResumeSubmissions from "./pages/ResumeSubmissions";
import EmployeePage from "./pages/EmployeePage";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/employee" />}
            ></Route>
            <Route path="/employee" element={<EmployeePage />}></Route>
            <Route path="/createjob" element={<JobForm />}></Route>
            <Route
              path="/signup"
              element={!user ? <SignupForm /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/login"
              element={!user ? <Loginform /> : <Navigate to="/" />}
            ></Route>
            <Route path="/viewmap" element={<ViewMap />}></Route>
            <Route path="/joblisting/:id" element={<JobDetails />}></Route>
            <Route path="/uploadresume" element={<ResumeForm />}></Route>
            <Route
              path="/resumesubmissions"
              element={<ResumeSubmissions />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
