import { createContext } from "react";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const contextValue = {};
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default { AppContext, AppContextProvider };
