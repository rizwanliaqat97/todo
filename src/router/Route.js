import { Route } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../appContext";
import { Redirect } from "react-router-dom";

const CustomRoute = ({ component: Component, requireAuth, ...rest }) => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <Route {...rest}>
      {requireAuth && !isLoggedIn ? <Redirect to="/login" /> : <Component />}
    </Route>
  );
};

export default CustomRoute;
