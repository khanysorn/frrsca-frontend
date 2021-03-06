import React from "react";
import { Layout, Card, Col, Row, Skeleton, Statistic, Table, Tag, message } from "antd";
import MenuBar from "../../components/student/Menu";
import { withRouter } from "react-router-dom";
import Footer from '../../components/Footer'
import ClassProvider from '../../services/class_provider'
import AuthenProvider from '../../services/authen_provider'
import { getUser, setUser } from '../../helper'
const { Header, Content } = Layout;

const columns = [
  {
    title: 'ครั้งที่',
    dataIndex: 'runningnumber',
    render: runningnumber => runningnumber+1 ,
    key: 'runningnumber',
  },
  {
    title: 'ประเภทห้องเรียน',
    dataIndex: 'classtype',
    key: 'classtype',
  },
  {
    title: 'เวลาที่เข้าเรียน',
    dataIndex: 'timestamp',
    render: timestamp => <>{timestamp.substring(0,10)} {timestamp.substring(11,16)} น.</>,
    key: 'timestamp',
  },
  {
    title: 'สถานะการเข้าเรียน',
    key: 'isontime',
    render: isontime => <Tag color={isontime==='F'? "red":"green"}>{isontime==='F'? "เข้าเรียนสาย":"เข้าเรียนตรงเวลา"}</Tag>,
    dataIndex: 'isontime'
  }
];


class OwnerAddCourse extends React.Component {

  constructor(props) {
    super(props)
        this.state = {
        subject: {
        course_name: "",
        section_name: "",
        lecturer_name: "",
        },
        attendance: [],
        isLoading: false
      };
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
    await this.getSubject();
  }

  getSubject = async () => {
    this.state.isLoading = true;
    try{
      const result1 = await ClassProvider.attendancehistorystudent({
        course_code: this.props.match.params.id,
        student_id: getUser().user_id,
      })
      console.log(result1)
      this.setState({ subject: result1.data });

      const result2 = await ClassProvider.gettimeofcourse({
        course_code: this.props.match.params.id,
        student_id: getUser().user_id,
      })
      console.log(result2)
      for (let i=0; i<result2.data.length; i++){
        result2.data[i].runningnumber=i;
        
      }
      this.setState({ attendance: result2.data });
      this.state.isLoading = false;
    }catch(e){
      this.state.isLoading = false;
      console.log(e)
    }


  };

  render() {
    
    return (
      <Layout className="layout">
        <Header>
            <MenuBar user={this.state.user}/>
        </Header>
        <Content style={{ padding: "0 50px", minHeight: "calc(100vh - 134px)" }}>
          <Row style={{ marginTop: "20px" }} gutter={[32, 32]}>
            <Col span={24}>
              <Card>
                {this.state.isLoading  === false ? (
                  <Skeleton active />
                ) : (
                  <>
                    <h1>{this.state.subject.course_code}</h1>
                    <h2>{this.state.subject.course_name}</h2>
                    <p>กลุ่มเรียน: {this.state.subject.section_name}</p>
                    <p>
                      อาจารย์ผู้สอน: {this.state.subject.lecturer_name}
                    </p>
                  </>
                )}
              </Card>
            </Col>
            {/* <Col span={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <Statistic title="สถานะของการมาเรียน" value="ดี" valueStyle={{ color: "#3f8600" }}/>
              </Card>
            </Col> */}
          </Row>
          <Row gutter={[32, 32]}>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
              {this.state.isLoading  === false ? (
                  <Skeleton active paragraph={{ rows: 2 }}/>
                ) : (<Statistic title="จำนวนครั้งที่มาเรียนตรงเวลา" value={this.state.subject.num_of_on_time} valueStyle={{ color: "#3f8600"}}/>)}
              </Card>
            </Col>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
              {this.state.isLoading  === false ? (
                  <Skeleton active paragraph={{ rows: 2 }}/>
                ) : (
                <Statistic title="จำนวนครั้งที่มาเรียนสาย" value={this.state.subject.num_of_late_1+this.state.subject.num_of_late_2+this.state.subject.num_of_late_3} valueStyle={{ color: "#d0021b" }} extra/>
                )}
              </Card>
            </Col>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
              {this.state.isLoading  === false ? (
                  <Skeleton active paragraph={{ rows: 2 }}/>
                ) : (
                <Statistic title="จำนวนครั้งที่ขาดเรียน" value={this.state.subject.num_of_absence} valueStyle={{ color: "#f8e71c" }}/>
                )}
              </Card>
            </Col>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
              {this.state.isLoading  === false ? (
                  <Skeleton active paragraph={{ rows: 2 }}/>
                ) : (
                <Statistic title="จำนวนครั้งที่ลาเรียน" value={this.state.subject.num_of_leave} valueStyle={{ color: "#595959" }}/>
                )}
              </Card>
            </Col>
          </Row>
          <Row span={24} style={{ marginTop: "20px", paddingLeft: "5px" }}>
            <h2>
            ประวัติการเข้าเรียน
            </h2>
            </Row>
            <Row span={24}>
            {this.state.isLoading  === false ? (
                 <Card style={{width: "100%"}} > <Skeleton active /> </Card>
                ) : (
            <Table columns={columns} dataSource={this.state.attendance} style={{width: "100%"}} />
                )}
          </Row> 
        </Content>
        <Footer/>
      </Layout>
    );
  }
}

export default withRouter(OwnerAddCourse);