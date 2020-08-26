import React from 'react';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import Class from './page/Class'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/class" component={Class} />
      </Switch>
    </Router>
  );
}

export default App;
