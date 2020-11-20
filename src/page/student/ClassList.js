import React from "react";
import { Layout, Card, Col, Row, Skeleton, Select, message } from "antd";
import { withRouter } from "react-router-dom";
import ContentLayoutStyle from "../../components/ContentLayoutStyle"
import MenuBar from "../../components/student/Menu";
import ClassProvider from '../../services/class_provider'
import Footer from '../../components/Footer';
const { Header, Content} = Layout;

const { Option } = Select;



function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}


class StudentClass extends React.Component {
  
  
  

  state = {
    data: [],name:"",surname:"",userid:"",
    filtersemester: "1/2563"
  };

  

  componentDidMount() {
    if (localStorage.getItem("user")){
        // ส่ง token ไป backend เพื่อดูข้อมูล
        // ให้ backend return แบบบรรทัดที่ 22
        const user = {name_th:"อิเกม .....",userid:"60130500008"}
        const name = user.name_th.split(" ")
        this.setState({name:name[0],surname:name[1],userid:user.userid})
        console.log(name)
        this.getSubjectList(user.userid);
    } else {
      this.props.history.push("/Login")
    }
    
    
  }


  getSubjectList = async (userid) => {
    try{
      const result = await ClassProvider.getlistcourseforstudent({
        semester: "1",
        academicyear: "2563",
        student_id: localStorage.getItem("user")
      })
      this.setState({data: result.data})
    }catch(e){
      console.log(e)
    }
  };

  setSemester = async(e) => {
    try{
      
      const value = e.split("/")
      console.log(value)
      const result = await ClassProvider.getlistcourseforstudent({
        semester: value[0],
        academicyear: value[1],
        student_id: localStorage.getItem("user")
      })
      this.setState({data: result.data,filtersemester:e})
    }catch(e){
      console.log(e)
    }
  }

render() {
  console.log(this.state.data)
  return (
    <>
      <Layout className="layout">
        <Header>
        <MenuBar name={this.state.name} surname={this.state.surname}/>
        </Header>
        <Content style={ContentLayoutStyle} >
          <h1 style={{ marginTop: "20px" }}>ห้องเรียนของฉัน
          <div style={{float: "right"}}>
          <Select defaultValue="1/2563" style={{ width: 120 }} value={this.state.filtersemester} onChange={this.setSemester}>
              <Option value="1/2563">1 / 2563</Option>
              <Option value="2/2563">2 / 2563</Option>
          </Select>
              </div>
              </h1>
            <div className="site-card-wrapper">
              <Row gutter={[32,32]}>
              {this.state.data.length === 0 ? (
              <>
              <Col xs={24} md={8} >
              <Card bordered={false}>
                  <Skeleton active />
              </Card>  
              </Col>
              </>
              ):(
                <>
                {this.state.data.map(item => {
                  return (
                    <Col xs={24} md={8} >
                      <Card bordered={false} onClick={()=> this.props.history.push(`/student/class/${item.coursecode}`)} style={{cursor: "pointer"}}>
                      <h2>{item.coursecode}</h2>
                      <h2>{item.coursename_en}</h2>
                      <p>กลุ่ม {item.sectionname}</p>
                        </Card>
                        
                    </Col>
                  )
                }
                )
              }
              </>
              )
            }
              </Row>
            </div>
        </Content>
        <Footer/>
      </Layout>
    </>
  );
}
}

export default withRouter(StudentClass);
