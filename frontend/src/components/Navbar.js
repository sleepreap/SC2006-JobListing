import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/createjob">
          <h1>Create Job Listings</h1>
        </Link>
        <Link to="/viewmap">
          <h1>View Map</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}> Logout</button>
          </div>
          <div>
            <Link to="/login">
              <h1>Login</h1>
            </Link>
            <Link to="/signup">
              <h1>Sign up</h1>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
