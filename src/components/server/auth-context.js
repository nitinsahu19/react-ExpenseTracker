import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(false);

  // Function to set the token in context
  const setAuthToken = (newToken) => {
    setToken(true);

    // saving the login token to the localStorage
    localStorage.setItem("token", newToken);
    console.log("Token successfully stored");
  };

  const contextValue = { login: setAuthToken, token };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default { AuthContext };
