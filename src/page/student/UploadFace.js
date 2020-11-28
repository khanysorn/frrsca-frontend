import React from "react";
import { Layout, Col, Row, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import ContentLayoutStyle from "../../components/ContentLayoutStyle";
import MenuBar from "../../components/student/Menu";
import AuthenProvider from "../../services/authen_provider";
import ClassProvider from "../../services/class_provider";
import Footer from "../../components/Footer";
import UploadBox from "../../components/student/UploadBox";
import { setUser } from '../../helper'
// import { getUploadImageURL } from '../../helper';

const { Header, Content } = Layout;

const { Dragger } = Upload;

const props = {
  name: "image",
  accept: ".jpg,.jpeg,.png",
  multiple: false,
  // action: getUploadImageURL(),
  onChange(info) {
    console.log(info)
    const { status } = info.file;
    if (status !== "กำลังอัปโหลด") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`ไฟล์ ${info.file.name} อัปโหลดรูปเสร็จสมบูรณ์`);
    } else if (status === "error") {
      message.error(`ไฟล์ ${info.file.name} อัปโหลดรูปไม่เสร็จสมบูรณ์`);
    }
  },
};

class UploadFace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: "",
      userid: "",
      image: null
    }
    this.onFileChange = this.onFileChange.bind(this)
  }


  async onFileChange(info){
    console.log(info)
    console.log(info.file) // should contain originFileObj
    let formData = new FormData()
    formData.append('image', info.file.originFileObj)
    await ClassProvider.addStudentImage("60130500008", formData)
    info.file.status = 'done'
  }

  async componentDidMount() {
    this.setState({isLoading: true})
    if (localStorage.getItem("token")){
      try{
        const result = await AuthenProvider.fetchme()
        console.log(result.data)
        // const { user_type } = result.data
        const user = result.data
        // save data into local storage
        setUser(user)
        this.setState({ user: user })
        if(user.user_type !== "st_group") {
          this.props.history.push("/Unauthorized")
        } 
      } catch(e) {
        console.log(e)
      } finally {
        this.setState({isLoading: false})
      }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <>
        <Layout className="layout">
          <Header>
            <MenuBar user={this.state.user}/>
          </Header>
          <Content style={ContentLayoutStyle}>
            <Row style={{ marginTop: "20px" }} gutter={[32, 32]}>
              <Col xs={24} md={18}>
                <h1>ระบบอัปโหลดรูปภาพ คืออะไร?</h1>
                <p style={{ marginBottom: "40px" }}>
                  ระบบอัปโหลดรูปภาพนี้
                  สร้างขึ้นเพื่อให้นักศึกษาอัปโหลดรูปภาพที่มีใบหน้าของตัวเองชัดเจน
                  เพื่อเพิ่มความแม่นยำของระบบตรวจจับใบหน้าเพื่อบันทึกเวลาเรียนของศึกษา
                </p>
                <h1>ฉันต้องอัปโหลดภาพแบบใด?</h1>
                <p>
                  คุณจะต้องอัปโหลดภาพที่ประกอบไปด้วยใบหน้าของคุณ
                  โดยที่เห็นใบหน้าของคุณได้อย่างชัดเจน
                  ไม่มีอะไรมาปิดบังใบหน้าของคุณ เช่น หน้ากากอนามัย แว่นดำ
                  แนะนำให้อัปโหลดรูปภาพในหลายๆ อิริยาบท เช่น ภาพ Selfle
                  ภาพหมู่ในแต่ละเหตุการณ์ หรือหลายๆ บุคลิก เช่น หน้าปกติ
                  หน้ายิ้ม หน้าบึ้ง เป็นต้น{" "}
                </p>
                <p style={{ marginBottom: "40px" }}>
                  และนี่เป็นตัวอย่างภาพที่ระบบสามารถนำไปเรียนรู้เพื่อเพิ่มความแม่นยำในการตรวจจับใบหน้าเพื่อ
                  บันทึกเวลาเรียนได้
                </p>
                <h1>จะมีใครเห็นรูปที่ฉันอัปโหลดขึ้นไปบ้าง?</h1>
                <p style={{ marginBottom: "40px" }}>
                  จะมีเพียงผู้พัฒนาระบบและระบบเรียนรู้ใบหน้าของระบบตรวจจับใบหน้าเท่านั้นที่จะเห็นรูปของคุณ
                  โดยรูปของคุณจะถูกจัดเก็บอย่างเป็นความลับ
                  และนำไปใช้เพื่อเพิ่มความแม่นยำของระบบเท่านั้น
                </p>
                <h1>รูปของฉันจะจัดเก็บถึงเมื่อไหร่?</h1>
                <p style={{ marginBottom: "40px" }}>
                  รูปของคุณจะถูกจัดเก็บอยู่บน Firebase Storage
                  จนกว่าจะถึงรอบที่ระบบเรียนรู้การจดจำใบหน้านำภาพไปใช้เพื่อ
                  Training ระบบ หลังจากที่ระบบเรียนรู้ใบหน้าของคุณเรียบร้้อยแล้ว
                  รูปภาพของคุณจะถูกลบทิ้งจาก Firebase Storage
                </p>
              </Col>
              <Col xs={24} md={6} style={UploadBox}>
                <h1 style={{ marginBottom: "20px" }}> อัปโหลดรูปภาพ</h1>
                <Dragger {...{...props, onChange: this.onFileChange}} >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    คลิกที่นี่ หรือลากไฟล์มายังบริเวณนี้
                  </p>
                  <p className="ant-upload-hint">
                  ประเภทไฟล์ที่รองรับ: JPG, JPEG, PNG
                  </p>
                </Dragger>
              </Col>
            </Row>
          </Content>
          <Footer />
        </Layout>
      </>
    );
  }
}

export default withRouter(UploadFace);
