import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthtContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>School Report</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user?.email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
