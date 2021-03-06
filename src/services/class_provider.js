import HttpRequest from './http_request_class'

class ClassProvider extends HttpRequest{


    // Class Attendance History
    attendancehistorystudent(payload){
        const useMock = false;
        return useMock ? new ClassProviderMock().attendancehistorystudent(payload) : this.post("/api/v1/class/attendance/attendancehistorystudent",payload)
    }
    
    gettimeofcourse(payload){
        return this.post("/api/v1/class/attendance/gettimeofcourse", payload)
    }

    getlistcourseforstudent(payload){
        return this.post("/api/v1/class/attendance/getlistcourseforstudent",payload)
    }

    liststudentattendance(payload){
        return this.post("/api/v1/class/attendance/liststudentattendanceclass", payload)
    }

    reportattendanceforlecturer(payload){
        return this.post("/api/v1/class/attendance/reportattendanceforlecturer", payload)
    }

    reportbydatetime(payload){
        return this.post("/api/v1/class/attendance/reportbydatetime", payload)
    }

    // Course Managemenr

    Getlisttimecourseforlecturer(payload){
        return this.post("/api/v1/class/attendance/getlistcourseforlecturer",payload)
    }

    classOverviewforLecturer(payload){
        return this.post("/api/v1/class/attendance/overviewforlecturer", payload)
    }

    classSetting(payload){
        return this.post("/api/v1/class/attendance/setting", payload)
    }

    // Timetable Management




    authentodb(payload){
        return this.post("api/v1/class/attendance/authentodb",payload)
    }




    getreportbystudent(payload){
        const useMock = false;
        return useMock ? new ClassProviderMock().getreportbystudent(payload) : this.post("/api/v1/class/attendance/attendancehistorystudent",payload)
    }

    
    getlistallstudentenrollcourse(payload){
        return this.post("/api/v1/class/attendance/getlistallstudentenrollcourse",payload)
    }

    addStudentImage(user_id, formData){
        return this.postFile(`api/v1/class/attendance/student/image/${user_id}`, formData)
    }

    getlistcourseforlecturer(payload){
        return this.post("/api/v1/class/attendance/getlistcourseforlecturer",payload)
    }

    gettimeclass(payload){
        return this.post("/api/v1/class/attendance/gettimeclass",payload)
    } 
    
    createchecklist(payload){
        return this.post("/api/v1/class/attendance/createchecklist",payload)
    }

    deletechecklist(payload){
        return this.post("/api/v1/class/attendance/deletechecklist",payload)
    }


}

class ClassProviderMock {
    attendancehistorystudent(payload){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                const forceReject = true;
                if (forceReject) {
                    reject({
                        error: "Internal Server Error",
                        status: 500
                    })
                } else{
                    resolve({data: {
                        "student_id": "60130500138",
                        "course_code": "INT305",
                        "course_name": "Human computer interaction",
                        "section_name": 1,
                        "lecturer_name": "Kittiphan Puapholthep",
                        "numOfOnTime": 5,
                        "numOfLate1": 2,
                        "numOfLate2": 1,
                        "numOfLate3": 0,
                        "numOfAbsence": ""
                      }})
                }
            },5000)
        })
    }

    getreportbystudent(payload){
        return new Promise((resolve,reject) => {
            resolve({
                data:[
                    {
                        "student_id": "60130500001",
                        "name_th": "กรวรรณ มโนรมย์",
                        "numOfOnTime": 5,
                        "numOfLate1": 2,
                        "numOfLate2": 1,
                        "numOfLate3": 0,
                        "numOfAbsence": 0,
                        "numOfLeave": 0
                    }
                ]})
        })
    }
}


export default new ClassProvider()