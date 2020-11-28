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
import Logout from "../page/Logout"
import Unauthorized from "../page/401"


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
      <Route exact path="/teacher/class/:id/:section/summary" component={TeacherClassSummary} />
      <Route exact path="/teacher/class/:id/:section/attendance" component={TeacherClassAttendance} />
      <Route exact path="/teacher/class/:id/:section/studentlist" component={TeacherClassStudentList} />
      <Route exact path="/teacher/class/:id/:section/report/attendance" component={TeacherClassReportAttendance} />
      <Route exact path="/teacher/class/:id/:section/report/student" component={TeacherClassReportStudent} />
      <Route exact path="/teacher/class/:id/:section/setting" component={TeacherClassSetting} />
      <Route exact path="/teacher/class/:id/:section/dashboard" component={TeacherClassDashboard} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
  )
}

export default Routing;
