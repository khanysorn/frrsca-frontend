import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PageNotFound from "../page/404"
import Home from "../page/Home";
import Login from "../page/Login";
import StudentClassList from "../page/student/ClassList";
import StudentClassDetail from "../page/student/ClassDetail";
import TeacherClassList from "../page/teacher/ClassList";
import TeacherClassSummary from "../page/teacher/Summary";
import TeacherClassAttendance from "../page/teacher/Attendance"
import TeacherClassStudentList from "../page/teacher/StudentList"
import TeacherClassReportAttendance from "../page/teacher/ReportByAttendance"
import TeacherClassReportStudent from "../page/teacher/ReportByStudent"
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
      <Route exact path="/teacher/class/attendance" component={TeacherClassAttendance} />
      <Route exact path="/teacher/class/studentlist" component={TeacherClassStudentList} />
      <Route exact path="/teacher/class/report/attendance" component={TeacherClassReportAttendance} />
      <Route exact path="/teacher/class/report/student" component={TeacherClassReportStudent} />
      <Route exact path="/teacher/class/setting" component={TeacherClassSetting} />
      <Route exact path="/teacher/class/dashboard" component={TeacherClassDashboard} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
  )
}

export default Routing;
