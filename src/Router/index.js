import React from 'react';
import TodoList from '../Components/todo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Components/login';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/todos">
          <TodoList />
        </Route>
        <Route path="/">
          <TodoList />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
