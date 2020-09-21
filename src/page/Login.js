import React, { useState } from "react";
import {Button} from "antd";
// import firebase from "firebase";
// import app from '../config';
import { useHistory } from "react-router-dom";
import LoginBox from '../components/LoginBox'


// const provider = new firebase.auth.GoogleAuthProvider();



function Login() {
  let history = useHistory();

  const [isLoading1,setLoading1] = useState(false);

  const [isLoading2,setLoading2] = useState(false);

  // firebase.auth().getRedirectResult().then(function(result) {
  //   if (result.credential) {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const token = result.credential.accessToken;
  //      history.push("/class");
  //     // ...
  //   }
  //   // The signed-in user info.
  //   const user = result.user;
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   const credential = error.credential;
  //   // ...
  // });

  // function handlelogin(){
  //   // app.auth().signInWithPopup(provider)
  // }

  function mockloginstudent(){
    setLoading1(true);
    setTimeout(()=>{
      setLoading1(false);
      history.push("/student/class")
  },1000)
  };

  function mockloginteacher(){
    setLoading2(true);
    setTimeout(()=>{
      setLoading2(false);
      history.push("/teacher/class")
  },1000)
  };

  
  
  return (
      <div className="background">
      <div style={LoginBox}>
      <h1>เข้าสู่ระบบ</h1>
        <p>ลงชื่อเข้าใช้ด้วยบัญชีผู้ใช้ของคณะเทคโนโลยีสารสนเทศ
        <br/ >มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</p>
        <p><Button type="primary" htmlType="submit" onClick={mockloginstudent} loading={isLoading1}>ลงชื่อเข้าใช้ในฐานะนักเรียน</Button></p>  
        <p><Button type="primary" htmlType="submit" onClick={mockloginteacher} loading={isLoading2}>ลงชื่อเข้าใช้ในฐานะอาจารย์ผู้สอน</Button></p>  
      </div>
    </div>
  );
}

export default Login;
