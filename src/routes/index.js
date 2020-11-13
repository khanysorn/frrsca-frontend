import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import StudentClassList from "../page/student/Class";
// import StudentClassDetail from "../page/student/ClassDetail";
import TeacherClassList from "../page/teacher/Class";
import TeacherClassDetail from "../page/teacher/ClassDetail";
// import TestSkeleton from "../page/test/TestSkeleton";
import TestFetchDataFromAPI from '../page/test/TestFetchDataFromAPI'


function Routing() {
    return(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/student/class" component={StudentClassList} />
      {/* <Route path="/student/class/:id" component={StudentClassList} /> */}
      <Route exact path="/student/class/:id" component={TestFetchDataFromAPI} />
      <Route exact path="/teacher/class" component={TeacherClassList} />
      <Route exact path="/teacher/class/detail" component={TeacherClassDetail} />
      {/* <Route exact path="/TestSkeleton" component={TestSkeleton} /> */}
      <Route exact path="/TestData" component={TestFetchDataFromAPI} />
    </Switch>
  </Router>
  )
}

export default Routing;
