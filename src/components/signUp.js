import { useContext, useState } from "react";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "./server/auth-context";

const SignUp = () => {
  // State variables to keep track of input form and user details
  const [haveAccount, setHaveAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // using to create a reference with the context store
  const authCtx = useContext(AuthContext);

  // Use the 'useNavigate' hook to get the 'navigate' function,  It allows us to navigate between different pages in the application without using traditional links.
  const navigate = useNavigate();

  // Handler functions to update state based on user input
  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);
  const confirmPasswordHandler = (event) =>
    setConfirmPassword(event.target.value);

  // Function to handle form submission
  const submitHandler = (event) => {
    event.preventDefault();

    if (!haveAccount) {
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        alert("Both entered password mismatch");
        return;
      }
    }

    let url, formValues;
    // condtionally selection the signIN and signUp url of firebase API
    if (!haveAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4";
      formValues = {
        email,
        password,
        returnSecureToken: true,
      };
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4";
      formValues = { email, password, returnSecureToken: true };
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
        if (!response.ok) {
          throw new Error("Error in sending data");
        }
        return response.json();
      })

      //getting response.json() data if all seems ok
      .then((data) => {
        console.log(data);
        // navigate to homepage if user did successful login
        navigate("/homepage");
      })

      // if login process throw some error
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

        {/* conditonal rendering for forgot password */}
        <div>
          {haveAccount && (
            <a className={classes.forgot_password} href="#">
              Forgot password
            </a>
          )}
        </div>

        {/* conditional rendering of Confirm Password input field */}
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
            <button type="submit">Login</button>
            <p>
              Don't have an account?
              <button type="button" onClick={accountHandler}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <button type="submit">Submit</button>
            <p>
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
