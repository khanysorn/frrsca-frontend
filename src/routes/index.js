import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import StudentClassList from "../page/student/Class";
import StudentClassDetail from "../page/student/ClassDetail";
import TeacherClassList from "../page/teacher/Class";
import TeacherClassSummary from "../page/teacher/Summary";
import TeacherClassAttendance from "../page/teacher/Attendance"
import TeacherClassStudentList from "../page/teacher/StudentList"
import TeacherClassReport from "../page/teacher/Report"
import TeacherClassSetting from "../page/teacher/Setting"
import TeacherClassDashboard from "../page/teacher/Dashboard"
import UploadFace from "../page/student/UploadFace";


function Routing() {
    return(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/student/class" component={StudentClassList} />
      <Route exact path="/student/class/:id" component={StudentClassDetail} />
      <Route exact path="/student/upload" component={UploadFace} /> 
      <Route exact path="/teacher/class" component={TeacherClassList} />
      <Route exact path="/teacher/class/summary" component={TeacherClassSummary} />
      <Route exact path="/teacher/class/student/attendance" component={TeacherClassAttendance} />
      <Route exact path="/teacher/class/student/list" component={TeacherClassStudentList} />
      <Route exact path="/teacher/class/student/report" component={TeacherClassReport} />
      <Route exact path="/teacher/class/setting" component={TeacherClassSetting} />
      <Route exact path="/teacher/class/dashboard" component={TeacherClassDashboard} />
    </Switch>
  </Router>
  )
}

export default Routing;
