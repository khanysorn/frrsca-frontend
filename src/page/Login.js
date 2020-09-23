import React, { useState } from "react";
import {Button} from "antd";
import firebase from "firebase";
import app from '../config';
import { useHistory } from "react-router-dom";
import LoginBox from '../components/LoginBox'


const provider = new firebase.auth.OAuthProvider('microsoft.com');



function Login() {
  let history = useHistory();

  const [isLoading1,setLoading1] = useState(false);

  const [isLoading2,setLoading2] = useState(false);

  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.
    // OAuth access token can also be retrieved:
    // result.credential.accessToken
    // OAuth ID token can also be retrieved:
    // result.credential.idToken
    history.push("/student/class")
  })
  .catch(function(error) {
    // Handle error.
  });

  function handlelogin(){
    app.auth().signInWithPopup(provider)
  }

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
        <p><Button type="primary" htmlType="submit" size="middle" onClick={mockloginstudent} loading={isLoading1}>ลงชื่อเข้าใช้ในฐานะนักเรียน</Button></p>  
        <p><Button type="primary" htmlType="submit" onClick={mockloginteacher} loading={isLoading2}>ลงชื่อเข้าใช้ในฐานะอาจารย์ผู้สอน</Button></p>  
        <p><Button type="primary" htmlType="submit" onClick={handlelogin} loading={isLoading2} style={{backgroundColor:"#fa4612"}}>ลงชื่อเข้าใช้ด้วย KMUTT Accounts</Button></p>  
      </div>
    </div>
  );
}

export default Login;
