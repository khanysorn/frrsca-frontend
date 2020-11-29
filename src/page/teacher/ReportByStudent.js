import React from "react";
// import { CSVLink } from "react-csv";
import { Layout, Breadcrumb, Table, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import ClassProvider from '../../services/class_provider'
import AuthenProvider from '../../services/authen_provider'
import { ExportCSV } from './ExportCSV'
import { setUser } from '../../helper'
const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: 'รหัสนักศึกษา',
    dataIndex: 'users_username',
    key: 'users_username',
  },
  {
    title: 'ชื่อ - นามสกุล',
    key: 'name_th',
    dataIndex: 'name_th'
  },
  {
    title: 'ตรงเวลา',
    key: 'ontime',
    dataIndex: 'ontime'
  },
  {
    title: 'สายครั้งที่ 1',
    key: 'late1',
    dataIndex: 'late1'
  },
  {
    title: 'สายครั้งที่ 2',
    key: 'late2',
    dataIndex: 'late2'
  },
  {
    title: 'สายครั้งที่ 3',
    key: 'late3',
    dataIndex: 'late3'
  },
  {
    title: 'ขาด',
    key: 'isleave',
    dataIndex: 'isleave'
  },
  {
    title: 'ลา',
    key: 'isabsent',
    dataIndex: 'isabsent'
  }
];


class ClassDetail extends React.Component {

  state = {
    collapsed: false,
    data: [],
    fileName:'ReportStudent'
  };
  

  async componentDidMount()  {
    if (localStorage.getItem("token")){
      const result = await AuthenProvider.fetchme()
      console.log(result.data)
      const user = result.data
      setUser(user)
      this.setState({ user: user })
      console.log(result.data.name_th)
      console.log(user.name_th)
        
        if(result.data.user_type === "inst_group") {
            // this.getSubjectList(user.userid);
        } else{
            this.props.history.push("/Unauthorized")
        }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }
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
    const {data} = await ClassProvider.reportattendanceforlecturer({
        course_code: this.props.match.params.id,
        section_name: this.props.match.params.section,
        semester: "1",
        academicyear: "2563"
    })

    console.table('getData', data)
    const attendance = Array.isArray(data) ? data.map((record, no) => ({no: no + 1, ...record})) : []
    this.setState({attendance})
    console.table(this.state.attendance)
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
        <User user={this.state.user} />
        </Header>
      <Content style={{ margin: '0 16px' }}>
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>รายงานการเข้าเรียนตามรายชื่อนักศึกษา</h1>
        <div className="col-md-4 center">
            <ExportCSV csvData={this.state.attendance} fileName={this.state.fileName} />
        </div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>
          <Breadcrumb.Item>รายงาน</Breadcrumb.Item>
          <Breadcrumb.Item>การเข้าเรียนตามรายชื่อนักศึกษา</Breadcrumb.Item>
        </Breadcrumb>
        {/* <div> */}
        
       

        <Table columns={columns} dataSource={this.state.attendance} style={{width: "100%", marginTop: "30px"}} bordered />
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
