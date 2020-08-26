import React from 'react';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
