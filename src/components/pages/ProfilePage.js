import { useEffect, useState } from "react";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  // State variables for storing name and profile picture URL
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [displayName, setDisplayName] = useState("User");
  const [photoUrl, setPhotoUrl] = useState("user_icon.png");

  // Event handler for updating 'name' and 'url' state based on input changes
  const nameHandler = (event) => setName(event.target.value);
  const urlHandler = (event) => setUrl(event.target.value);

  // Event handler for submitting contact details form
  const contactDetailsHandler = (event) => {
    // Preventing the default form submission behavior
    event.preventDefault();

    // Sending a POST request to a server
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4",
      {
        method: "POST",
        // Converting state variables to JSON and sending them in the request body
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: name,
          photoUrl: url,
          returnSecureToken: true,
        }),
        // Setting the content type for the request
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in updating the profile");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      // catching errors if occurs
      .catch((error) => console.log(error.message));
  };

  const getUserData = () => {
    // doing request do get the stored data for profile details
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBGskndt7Y9RhmytxZADFlsOH8jfKpjRi4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          returnSecureToken: true,
        }),
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("Error in fetching user details");
        }
        return response.json();
      })
      .then((data) => {
        // Check if data is available and log the result
        if (data) {
          console.log("Data fetched successfully:", data);
          //  response from the server is an array of users, not a single user object.
          setDisplayName(data.users[0].displayName);
          setPhotoUrl(data.users[0].photoUrl);
        } else {
          console.log("Data is not available in the database.");
        }
      })
      .catch((error) => console.log(error.message));
  };

  // getUserData() call on the page refresh only once
  useEffect(getUserData, []);

  return (
    <>
      {/* Top section with a quote and profile completion notification */}
      <div className={classes.top}>
        <p className={classes.quote}>Winners never quit, Quitters never win.</p>

        {/*profile section includes photo & name  */}
        <div className={classes.profile}>
          <img
            className={classes.userIcon}
            src={`assets/${photoUrl}`}
            alt="User Icon"
          />
          <h2 className={classes.userText}>{`Hi, ${displayName}`}</h2>
        </div>

        <p className={classes.notify}>
          Your Profile is 64% completed. A complete Profile has higher chances
          of landing a job.
          <span>
            <i>Complete Now</i>
          </span>
        </p>
      </div>
      {/* Body section containing contact details  */}
      <div className={classes.inner_body}>
        <div>
          {/* Heading and cancel button */}
          <h2>Contact Details</h2> <button>Cancel</button>
        </div>

        <div>
          {/* Form inputs for full name and profile photo URL */}
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="full-name"
            placeholder="enter your full name..."
            onChange={nameHandler}
            value={name}
            required
          ></input>

          <label htmlFor="photo-url">Profile Photo URL</label>
          <input
            type="url"
            id="photo-url"
            placeholder="paste your profile pic URL"
            onChange={urlHandler}
            value={url}
            required
          ></input>

          {/* Button to trigger the contactDetailsHandler function */}
          <button
            onClick={contactDetailsHandler}
            className={classes.update_btn}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
