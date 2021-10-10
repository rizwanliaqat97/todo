import React from "react";
import TodoList from "../Components/todo";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "../Components/login";
import Route from "./Route";
import NotFound from "../Components/Layouts/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={TodoList} requireAuth exact />
        <Route path="/todos" component={TodoList} requireAuth exact />
        <Route path="/login" component={Login} exact />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
