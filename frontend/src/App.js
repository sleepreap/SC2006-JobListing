import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages & component
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import JobForm from "./pages/JobForm";
import ViewMap from "./pages/ViewMap";
import JobDetails from "./pages/JobDetails";
import SignupForm from "./pages/SignupForm";
import Loginfrom from "./pages/LoginForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />}>
              {/* element={user ? <Home /> : <Navigate to="/login" />}  */}
            </Route>
            <Route path="/createjob" element={<JobForm />}></Route>
            <Route path="/signup" element={<SignupForm />}>
              {/* element={!user ? <Signup /> : <Navigate to="/" />}  */}
            </Route>
            <Route path="/login" element={<Loginfrom />}>
              {/* element={!user ? <Login /> : <Navigate to="/" />}  */}
            </Route>
            <Route path="/viewmap" element={<ViewMap />}></Route>
            <Route path="/joblisting/:id" element={<JobDetails />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
