import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  // Handler function for logout action.
  const logoutHandler = () => {
    // Removing the "token" from the local storage upon logout.
    localStorage.removeItem("token");
  };

  return (
    <>
      {/* Unordered list for navigation links with styling from the imported CSS module. */}
      <ul className={classes.navList}>
        {/* List item with a Link component for the "Home" route. */}
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        {/* List item with a Link component for the "Profile" route. */}
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {/* List item with a link component for the "Expenses" route */}
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        {/* List item with a button for logout, triggering the logoutHandler function on click. */}
        <li>
          <button onClick={logoutHandler} type="button">
            Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default NavigationBar;
