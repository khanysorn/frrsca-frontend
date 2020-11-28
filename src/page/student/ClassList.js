import React from "react";
import { Layout, Card, Col, Row, Skeleton, Select, message } from "antd";
import { withRouter } from "react-router-dom";
import ContentLayoutStyle from "../../components/ContentLayoutStyle"
import MenuBar from "../../components/student/Menu";
import ClassProvider from '../../services/class_provider'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider'
import { getUser, setUser } from '../../helper'
const { Header, Content} = Layout;

const { Option } = Select;


// เดี๋ยวกลับมา
// function handleMenuClick(e) {
//   message.info('Click on menu item.');
//   console.log('click', e);
// }


class StudentClass extends React.Component {

  constructor(props) {
    super(props)
    console.log("Ayooo from constructor")
    console.table(this.state)
    
    // Set default state
    this.state = {
      data: [],
      filtersemester: "1/2563",
      isLoading: false,
      user: {}
    }
    
    // bind function
    this.getSubjectList = this.getSubjectList.bind(this)
    this.setSemester = this.setSemester.bind(this)
  }

  
  async componentDidMount()  {
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
    await this.getSubjectList();
  }

  async getSubjectList () {
    this.setState({isLoading: true})
    try{
      const result = await ClassProvider.getlistcourseforstudent({
        semester: "1",
        academicyear: "2563",
        student_id: getUser().user_id
      })
      this.setState({ data: result.data })
    }catch(e){
      console.log(e)
    } finally {
      this.setState({ isLoading: false})
    }
  };

  async setSemester(e) {
    try{
      const value = e.split("/")
      console.log(value)
      const result = await ClassProvider.getlistcourseforstudent({
        semester: value[0],
        academicyear: value[1],
        student_id: getUser().user_id
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
            <MenuBar user={this.state.user}/>
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
                {this.state.isLoading ? (
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
