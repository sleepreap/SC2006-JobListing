import { Link } from "react-router-dom";

const Navbar = () => {
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
      </div>
    </header>
  );
};

export default Navbar;
