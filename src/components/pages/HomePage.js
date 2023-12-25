import { NavLink } from "react-router-dom";
import classes from "./HomePage.module.css";
import NavigationBar from "../navigationBar/NavigationBar";

const HomePage = () => {
  const emailVerificationHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
          // Setting the content type for the request
          headers: { "Content-Type": "application/json" },
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email verification failed");
        }
        return response.json();
      })
      .then((data) => console.log(`Your email: ${data} is verified`, data))
      .catch((error) => console.log(error.message));
  };
  return (
    <>
      <NavigationBar />
      <div>
        <h3 className={classes.welcome_text}>Welcome to Expense tracker</h3>
        <p className={classes.profileIncomplete_text}>
          Your profile is incomplete
          <NavLink to="/profile">
            <span>Complete Now</span>
          </NavLink>
        </p>
      </div>

      <div>
        <button onClick={emailVerificationHandler}>Verify email</button>
      </div>
    </>
  );
};

export default HomePage;
