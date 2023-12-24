import { NavLink } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <h3 className={classes.welcome_text}>Welcome to Expense tracker</h3>
      <p className={classes.profileIncomplete_text}>
        Your profile is incomplete{" "}
        <NavLink to="/profile">
          <span>Complete Now</span>
        </NavLink>
      </p>
    </>
  );
};

export default HomePage;
