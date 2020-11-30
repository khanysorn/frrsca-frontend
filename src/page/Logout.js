import React from 'react'
import { withRouter } from "react-router-dom";

class Logout extends React.Component{

    render(){

        if (localStorage.getItem("token")){
            localStorage.removeItem("token");  
            this.props.history.push("/Login")
        } else {
            this.props.history.push("/Login")
        }

        return(
            <>
            </>
        )
    }

}

export default withRouter(Logout);