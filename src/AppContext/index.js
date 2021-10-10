import { createContext, useEffect, useState } from "react";
import client from "../API/client";

const defaultValues = {
  isLoggedIn: false,
  user: {},
  auth: {},
};

const AppContext = createContext(defaultValues);

export const AppContextWrapper = ({ children }) => {
  const [contextValues, setContextValues] = useState(defaultValues);
  useEffect(() => {
    client.reAuthenticate().then(
      (auth) => setContextValues({ isLoggedIn: true, user: auth.user, auth }),
      () => setContextValues(defaultValues)
    );

    client.on("logout", () => console.log("user loged out"));
    client.on("disconnect", () => console.log("user loged out"));
  }, []);

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppContext;
