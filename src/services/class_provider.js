import HttpRequest from './http_request'

class ClassProvider extends HttpRequest{
    attendancehistorystudent(payload){
        const useMock = false;
        return useMock ? new ClassProviderMock().attendancehistorystudent(payload) : this.post("/api/v1/class/attendance/attendancehistorystudent",payload)
    }

    gettimeofcourse(payload){
        return this.post("api/v1/class/attendance/gettimeofcourse",payload)
    }

    getlistcourseforstudent(payload){
        return this.post("api/v1/class/attendance/getlistcourseforstudent",payload)
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

}


export default new ClassProvider()