import React from "react";
import { Layout, Breadcrumb, Table } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import ClassProvider from '../../services/class_provider'
const { Header, Content, Sider } = Layout;


const columns = [
  {
    title: 'รหัสนักศึกษา',
    dataIndex: 'student_id',
    key: 'student_id',
  },
  {
    title: 'ชื่อ - นามสกุล',
    key: 'name_th',
    dataIndex: 'name_th'
  },
  {
    title: 'ตรงเวลา',
    key: 'numOfOnTime',
    dataIndex: 'numOfOnTime'
  },
  {
    title: 'สายครั้งที่ 1',
    key: 'numOfLate1',
    dataIndex: 'numOfLate1'
  },
  {
    title: 'สายครั้งที่ 2',
    key: 'numOfLate2',
    dataIndex: 'numOfLate2'
  },
  {
    title: 'สายครั้งที่ 3',
    key: 'numOfLate3',
    dataIndex: 'numOfLate3'
  },
  {
    title: 'ขาด',
    key: 'numOfAbsence',
    dataIndex: 'numOfAbsence'
  },
  {
    title: 'ลา',
    key: 'numOfLeave',
    dataIndex: 'numOfLeave'
  }
];


class ClassDetail extends React.Component {

  state = {
    collapsed: false,
    data:[],
  };

  componentDidMount() {
    this.getData()
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  getData = async () => {
  try{
    const {data} = await ClassProvider.getreportbystudent({
      course_code: this.props.match.params.id,
      student_id: localStorage.getItem("user"),
    })

    console.log('getData', data)

    this.setState({data})
  }catch(e){
    console.log(e)
  }
  } 

  render() {
    const { collapsed } = this.state;
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme="light">
        <div className="logo" />
        <MenuBar  />
      </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} >
        <User/>
        </Header>
      <Content style={{ margin: '0 16px' }}>
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>รายงานการเข้าเรียนตามรายชื่อนักศึกษา</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>รายงาน</Breadcrumb.Item>
          <Breadcrumb.Item>การเข้าเรียนตามรายชื่อนักศึกษา</Breadcrumb.Item>
        </Breadcrumb>
        
        <Table columns={columns} dataSource={this.state.data} style={{width: "100%", marginTop: "30px"}} bordered />
        <div className="site-layout-background">
          
        </div>
        
      </Content>
      <Footer/>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
