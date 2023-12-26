import { useState } from "react";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // Define a handler function 'emailHandler' to update the 'email' state based on user input.
  const emailHandler = (event) => setEmail(event.target.value);

  // Define an asynchronous handler function 'forgotPasswordHandler' to send a password reset request.
  const forgotPasswordHandler = async () => {
    try {
      // Use the 'fetch' API to send a POST request to the Firebase Authentication API for password reset.
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4",
        {
          method: "POST",
          // Send a JSON payload with the request type and user email.
          body: JSON.stringify({ requestType: "PASSWORD_RESET", email }),
          // Set headers to specify the content type as JSON.
          headers: { "Content-Type": "application/json" },
        }
      );

      // Check if the response is not okay, throw an error.
      if (!response.ok) {
        throw new Error("Forgot password failed");
      }

      // Parse the response JSON data.
      const data = await response.json();

      // Log the response data to the console.
      console.log(data);
    } catch (error) {
      // Log any errors that occur during the password reset process.
      console.log(error.message);
    }

    // clearing the input field
    setEmail("");
  };

  return (
    <>
      <div className={classes.forgot_password}>
        {/* Label for the email input field. */}
        <label htmlFor="email">Enter the registered email.</label>
        {/* Input field for the user to enter their email address. */}
        <input
          id="email"
          type="email"
          placeholder="Email...."
          // Attach the 'emailHandler' function to the 'onChange' event of the input field.
          onChange={emailHandler}
          // Set the input value to the current value of the 'email' state.
          value={email}
          // Make the email input field required.
          required
        ></input>
        {/* Button to trigger the 'forgotPasswordHandler' function when clicked. */}
        <button
          className={classes.forgot_button}
          // Attach the 'forgotPasswordHandler' function to the 'onClick' event of the button.
          onClick={forgotPasswordHandler}
        >
          Send link
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
