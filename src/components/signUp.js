import { useState } from "react";
import classes from "./SignUp.module.css";

// Functional component SignUp
const SignUp = () => {
  // State variables to keep track of input form and user details
  const [haveAccount, setHaveAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handler functions to update state based on user input
  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);
  const confirmPasswordHandler = (event) =>
    setConfirmPassword(event.target.value);

  // Function to handle form submission
  const submitHandler = (event) => {
    event.preventDefault();

    let url, formValues;

    // condtionally selection the signIN and signUp url of firebase API
    if (!haveAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4";
      formValues = { email, password, confirmPassword };
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4";
      formValues = { email, password };
    }

    // unfilling the input fields of form
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // request to the firebase server to post the form data
    fetch(url, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error in sending data");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Function to toggle between Sign Up and Sign In views
  const accountHandler = () => {
    setHaveAccount(!haveAccount);
  };

  return (
    <>
      <form onSubmit={submitHandler} className={classes.signup_form}>
        {/* Conditional rendering based on haveAccount state */}
        {haveAccount ? <h2>Sign in</h2> : <h2>Sign Up</h2>}

        {/* Email input field with corresponding event handlers */}
        <label htmlFor="email">Enter Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter your email..."
          onChange={emailHandler}
          value={email}
          required
        />

        {/* Password input field with corresponding event handlers */}
        <label htmlFor="password">Enter Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter your password..."
          onChange={passwordHandler}
          value={password}
          required
        />

        {/* Conditional rendering of Confirm Password input field */}
        {!haveAccount && (
          <>
            <label htmlFor="confirm-password">Confirm Password: </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="confirm your password..."
              onChange={confirmPasswordHandler}
              value={confirmPassword}
              required
            />
          </>
        )}

        {/* Conditional rendering of buttons based on haveAccount state */}
        {haveAccount ? (
          <>
            <p>
              <button type="submit">Login</button>
              Don't have an account?
              <button type="button" onClick={accountHandler}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <p>
              <button type="submit">Submit</button>
              Have an account?{" "}
              <button type="button" onClick={accountHandler}>
                Login
              </button>
            </p>
          </>
        )}
      </form>
    </>
  );
};

export default SignUp;
