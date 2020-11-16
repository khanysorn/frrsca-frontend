import React from "react";
import { Layout, Card, Col, Row, Skeleton, Statistic, Table, Tag } from "antd";
import MenuBar from "../../components/student/Menu";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Footer from '../../components/Footer'
const { Header, Content } = Layout;

const columns = [
  {
    title: 'ครั้งที่',
    dataIndex: 'runningnumber',
    render: runningnumber => runningnumber+1 ,
    key: 'runningnumber',
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

  state = {
    subject: {
    course_name: "",
    },
    attendance: [],
    isLoading: false
  };

  componentDidMount() {
    this.getSubject();
  }

  getSubject = async () => {
    // this.props.match.params.id
    this.state.isLoading = true;
    const res1 = await axios.post(
      "https://frrsca-backend.khanysorn.me/api/v1/class/attendance/attendancehistorystudent",
      {
        course_code: this.props.match.params.id,
        student_id: "60130500138",
      },
      { header: { "Access-Control-Allow-Origin": true } }
    );
    console.log(res1.data);
    this.setState({ subject: res1.data });

    const res2 = await axios.post(
      "https://frrsca-backend.khanysorn.me/api/v1/class/attendance/gettimeofcourse",
      {
        course_code: this.props.match.params.id,
        student_id: "60130500138",
      },
      { header: { "Access-Control-Allow-Origin": true } }
    );
    console.log(res2.data);
    for (let i=0; i<res2.data.length; i++){
      res2.data[i].runningnumber=i;
    }
    this.setState({ attendance: res2.data });
    this.state.isLoading = false;
  };

  render() {

    console.log(this.props.match.params.id);
    
    return (
      <Layout className="layout">
        <Header>
          <MenuBar />
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
                    {/* <p>กลุ่มเรียน: 1</p>
                    <p>
                      อาจารย์ผู้สอน:{" "}
                      <Avatar size="small" icon={<UserOutlined />} /> อ.คณิศร
                      ชัยวิชาชาญ
                    </p> */}
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
                <Statistic title="จำนวนครั้งที่มาเรียนตรงเวลา" value={this.state.subject.numOfOnTime} valueStyle={{ color: "#3f8600"}}/>
              </Card>
            </Col>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <Statistic title="จำนวนครั้งที่มาเรียนสาย" value={this.state.subject.numOfLate1+this.state.subject.numOfLate2+this.state.subject.numOfLate3} valueStyle={{ color: "#d0021b" }} extra/>
              </Card>
            </Col>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <Statistic title="จำนวนครั้งที่ขาดเรียน" value={this.state.subject.numOfAbsence} valueStyle={{ color: "#f8e71c" }}/>
              </Card>
            </Col>
            <Col span={6} xs={12} md={6}>
              <Card style={{height: "100%", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <Statistic title="จำนวนครั้งที่ลาเรียน" value="0" valueStyle={{ color: "#595959" }}/>
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
