import React from 'react';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import Class from './page/Class'
import ClassDetail from './page/ClassDetail';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/class" component={Class} />
      <Route path="/classdetail" component={ClassDetail} />
      </Switch>
    </Router>
  );
}

export default App;
