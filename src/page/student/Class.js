import React from "react";
import { Layout, Card, Col, Row, Skeleton  } from "antd";
import { withRouter } from "react-router-dom";
import ContentLayoutStyle from "../../components/ContentLayoutStyle"
import MenuBar from "../../components/Menu";
import axios from 'axios'
const { Header, Content, Footer} = Layout;


//  const data = [{id : 'INT 206' ,name : "การบริหารโครงการซอฟต์แวร์" , section : "SECTION 1" },
//  {id : 'INT 206' ,name : "การบริหารโครงการซอฟต์แวร์" , section : "SECTION 1" },
//  {id : 'INT 206' ,name : "การบริหารโครงการซอฟต์แวร์" , section : "SECTION 1" },
//  {id : 'INT 206' ,name : "การบริหารโครงการซอฟต์แวร์" , section : "SECTION 1" }]


class StudentClass extends React.Component {
  
  state = {
    data: [],
  };

  componentDidMount() {
    this.getSubjectList();
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
          <h1 style={{ marginTop: "20px" }}>ห้องเรียนของฉัน</h1>
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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
}

export default withRouter(StudentClass);
