import React from "react";
import { Layout, Col, Row } from "antd";
import { withRouter } from "react-router-dom";
import ContentLayoutStyle from "../../components/ContentLayoutStyle"
import MenuBar from "../../components/student/Menu";
import axios from 'axios'
const { Header, Content, Footer} = Layout;


class UploadFace extends React.Component {
  
  state = {
    data: [],
  };

  componentDidMount() {
    
  }


  getSubjectList = async () => {
    // this.props.match.params.id
    const res = await axios.post(
      "https://frrsca-backend.khanysorn.me/api/v1/class/attendance/getlistcourseforstudent",
      {
        student_id: "60130500138",
      },
      { header: { "Access-Control-Allow-Origin": true } }
    );
    console.log(res.data);
    this.setState({ data: res.data });
  };

render() {
  console.log(this.state.data)
  return (
    <>
      <Layout className="layout">
        <Header>
        <MenuBar/>
        </Header>
        <Content style={ContentLayoutStyle} >
         <Row style={{ marginTop: "20px" }} gutter={[32,32]}>
            <Col xs={24} md={18}>
                <h1>ระบบอัพโหลดรูปภาพ คืออะไร?</h1>
                <p style={{marginBottom: "40px"}}>ระบบอัพโหลดรูปภาพนี้ สร้างขึ้นเพื่อให้นักศึกษาอัพโหลดรูปภาพที่มีใบหน้าของตัวเองชัดเจน เพื่อเพิ่มความแม่นยำของระบบตรวจจับใบหน้าเพื่อบันทึกเวลาเรียนของศึกษา</p>
                <h1>ฉันต้องอัพโหลดภาพแบบใด?</h1>
                <p >คุณจะต้องอัพโหลดภาพที่ประกอบไปด้วยใบหน้าของคุณ โดยที่เห็นใบหน้าของคุณได้อย่างชัดเจน ไม่มีอะไรมาปิดบังใบหน้าของคุณ เช่น หน้ากากอนามัย แว่นดำ แนะนำให้อัพโหลดรูปภาพในหลายๆ อิริยาบท เช่น ภาพ Selfle ภาพหมู่ในแต่ละเหตุการณ์ หรือหลายๆ บุคลิก เช่น หน้าปกติ หน้ายิ้ม หน้าบึ้ง เป็นต้น </p>
                <p style={{marginBottom: "40px"}}>และนี่เป็นตัวอย่างภาพที่ระบบสามารถนำไปเรียนรู้เพื่อเพิ่มความแม่นยำในการตรวจจับใบหน้าเพื่อ บันทึกเวลาเรียนได้</p>
                <h1>จะมีใครเห็นรูปที่ฉันอัพโหลดขึ้นไปบ้าง?</h1>
                <p style={{marginBottom: "40px"}}>จะมีเพียงผู้พัฒนาระบบและระบบเรียนรู้ใบหน้าของระบบตรวจจับใบหน้าเท่านั้นที่จะเห็นรูปของคุณ โดยรูปของคุณจะถูกจัดเก็บอย่างเป็นความลับ และนำไปใช้เพื่อเพิ่มความแม่นยำของระบบเท่านั้น</p>
                <h1>รูปของฉันจะจัดเก็บถึงเมื่อไหร่?</h1>
                <p style={{marginBottom: "40px"}}>รูปของคุณจะถูกจัดเก็บอยู่บน Firebase Storage จนกว่าจะถึงรอบที่ระบบเรียนรู้การจดจำใบหน้านำภาพไปใช้เพื่อ Training ระบบ หลังจากที่ระบบเรียนรู้ใบหน้าของคุณเรียบร้้อยแล้ว รูปภาพของคุณจะถูกลบทิ้งจาก Firebase Storage</p>
            </Col>
            <Col xs={24} md={6}>col-6</Col>
         </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
}

export default withRouter(UploadFace);
