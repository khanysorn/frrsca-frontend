import React from 'react';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
