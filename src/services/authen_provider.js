import HttpRequest from './http_request_authen'

class ClassProvider extends HttpRequest{
    //not used 
    gettoken(payload){
        // const client_secret = ""
        // const 
        return this.post("api/oauth/token?client_secret=your secret code&client_id=your id&code=code that your auth&redirect_uri=your redirect uri",payload)
    }

    fetchme(){
        return this.get("api/me",null, true)
    }

}


export default new ClassProvider()