import React, { useState, useEffect } from "react";
import { Button, message} from "antd";
import { useHistory, withRouter } from "react-router-dom";
import ModalBox from '../components/ModalBox'
import queryString from "query-string"
// import ClassProvider from '../services/class_provider'
import AuthenProvider from '../services/authen_provider'
import { getToken, setToken } from "../helpers";

function Login(props) {

  const history = useHistory();

  // const [isLoading1,setLoading1] = useState(false);

  // const [isLoading2,setLoading2] = useState(false);

  const [isLoading3,setLoading3] = useState(false);

  
  useEffect(() => {
      handlelogin()
  // eslint-disable-next-line
  },[])

  async function handlelogin(){
    const parsed = queryString.parse(props.location.search);
    setLoading3(true);
    console.log(parsed.code);
    if (parsed.code){
    const url = 'https://gatewayservice.sit.kmutt.ac.th/api/oauth/token'
    const secret = 'iPJIgH6dy4lTw1VBWYe3R2NjA'
    const clientId = "iNX5UkwC"
    const resFromSSO = await fetch(`${url}?client_secret=${secret}&client_id=${clientId}&code=${parsed.code}&redirect_uri=http://localhost:3000/Login`)
    // const user = await Login(await resFromSSO.json())
    const resFromSSOData = await resFromSSO.json()
    console.log(resFromSSOData)
      // try{
      //   const loginreponse = await ClassProvider.authentodb({
      //     user_id: resFromSSOData.user_id,
      //     name_th: resFromSSOData.name_th,
      //     name_en: resFromSSOData.name_en,
      //     email: resFromSSOData.email,
      //     token: resFromSSOData.token,
      //     create_user_date: `${resFromSSOData.created_at.substring(0,10)} ${resFromSSOData.created_at.substring(11,19)}.000000`,
      //     role: resFromSSOData.user_type
      //   })
      //   console.log(loginreponse)
      // }catch(e){
      //   console.log(e)
      // }
    // ส่งค่าไปให้ Backend
    // getuser ก่อน ว่ามี user อยู่บน db ไหม ถ้ามี ก็ไม่ต้่องสร้าง ถ้าไม่มีก็เพิ่ม
    // หลังจากที่เพิ่ม Backend เสร็จ Backend ต้อง generate token ขึ้นมา แล้วส่งกลับมาที่ frontend :) มาแทนที่ ID อันนี้
    setToken(resFromSSOData.token.token)

    try {
      const fetch = await AuthenProvider.fetchme({
        token: getToken()
      })
      console.log(fetch)
    } catch (error) {
      message.error('เกิดข้อผิดพลาด' & error)
    }

    if(fetch.user_type==="st_group"){
      history.push("/student/class");
      setLoading3(false);
    } else if (fetch.user_type==="inst_group"){
      history.push("/teacher/class");
      setLoading3(false);
    } else {
      message.error('เกิดข้อผิดพลาด');
    }
  }
  setLoading3(false);
  }


  function mockloginstudent(){
    setLoading1(true);
    // return from backend {id : '123'}
    // const res = {id : '123'}
    // localStorage.setItem('userId', res.id)

  // function mockloginstudent(){
  //   setLoading1(true);
  //   // return from backend {id : '123'}
  //   // const res = {id : '123'}
  //   // localStorage.setItem('userId', res.id)
    
  //   setTimeout(()=>{
  //     setLoading1(false);
  //     history.push("/student/class")
  // },1000)
  // };

  // function mockloginteacher(){
  //   setLoading2(true);
  //   setTimeout(()=>{
  //     setLoading2(false);
  //     history.push("/teacher/class")
  // },1000)
  // };

  
  
  return (
      <div className="background">
      <div style={ModalBox}>
      <div style={{display: "flex", flexDirection:"column", justifyContent:"space-between", height: "100%"}}>
      <div>
      <h1>เข้าสู่ระบบ</h1>
        <p>ลงชื่อเข้าใช้ด้วยบัญชีผู้ใช้ของคณะเทคโนโลยีสารสนเทศ
        <br/ >มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี</p>
        {/* <p><Button type="primary" htmlType="submit" size="middle" onClick={mockloginstudent} loading={isLoading1} >ลงชื่อเข้าใช้ในฐานะนักเรียน</Button></p>  
        <p><Button type="primary" htmlType="submit" onClick={mockloginteacher} loading={isLoading2}>ลงชื่อเข้าใช้ในฐานะอาจารย์ผู้สอน</Button></p>   */}
        <p><a href="https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=iNX5UkwC&redirect_uri=http://localhost:3000/Login&state=frrsca"><Button type="primary" loading={isLoading3}>ลงชื่อเข้าใช้ด้วย SIT SSO</Button></a></p>
      </div>
      <div>
        <p style={{marginTop:"auto"}}>หากยังไม่เปิดใช้งานบัญชี <a href="https://students.sit.kmutt.ac.th/SSSA/">คลิกที่นี่</a>
        <br/ >หากลืมรหัสผ่าน <a href="https://myaccount.kmutt.ac.th/accountactivation-app/recovery-account">คลิกที่นี่</a></p> 
      </div>
      </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
