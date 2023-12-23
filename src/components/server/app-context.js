import { createContext } from "react";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const appCtx = {};
  return <AppContext.Provider>{props.children}</AppContext.Provider>;
};

export default { AppContext, AppContextProvider };
