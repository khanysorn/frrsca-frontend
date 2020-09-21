import React from 'react';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import StudentClassList from './page/student/Class'
import StudentClassDetail from './page/student/ClassDetail';
import TeacherClassList from './page/teacher/Class'
import TeacherClassDetail from './page/teacher/ClassDetail'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/student/class" component={StudentClassList} />
      <Route path="/student/classdetail" component={StudentClassDetail} />
      <Route path="/teacher/class" component={TeacherClassList} />
      <Route path="/teacher/classdetail" component={TeacherClassDetail} />
      </Switch>
    </Router>
  );
}

export default App;
