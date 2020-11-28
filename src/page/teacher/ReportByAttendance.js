import React from "react";
import { Layout, Breadcrumb, Table, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider'
import ClassProvider from '../../services/class_provider'
const { Header, Content, Sider } = Layout;


const columns = [
  {
    title: 'ครั้งที่',
    dataIndex: 'runningnumber',
    render: runningnumber => runningnumber+1 ,
    key: 'runningnumber',
  },
  {
    title: 'เวลาที่เริ่มคาบเรียน',
    dataIndex: 'timestart',
    key: 'timestart',
  },
  {
    title: 'เวลาที่หมดคาบเรียน',
    dataIndex: 'timeend',
    key: 'timeend',
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

  constructor(props) {
    super(props)
        this.state = {
        user: {},
        data:{},
        attendance: [],
        isLoading: false,
        collapsed: false,
      };
  }
  async componentDidMount()  {
    if (localStorage.getItem("token")){
        const result = await AuthenProvider.fetchme()
        console.log(result.data)
        // const { user_type } = result.data
        this.setState({ data: result.data })
        console.log(result.data.name_th)
        console.table(this.state.data);
        
        if(result.data.user_type === "inst_group") {

        } else{
            this.props.history.push("/Unauthorized")
        }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }

    this.getData()
  }

  async getData(){
    try{
      const {data} = await ClassProvider.reportbydatetime({
          course_code: this.props.match.params.id,
          section_name: this.props.match.params.section,
          semester: "1",
          academicyear: "2563"
      })
  
      console.log('getData', data)

      this.setState({attendance: data})
      console.table(this.state.attendance)

    }catch(e){
      console.log(e)
    }

  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };


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
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>รายงานการเข้าเรียนตามรายการเช็กชื่อ</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>รายงาน</Breadcrumb.Item>
          <Breadcrumb.Item>การเข้าเรียนตามรายชื่อนักศึกษา</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background">
          <Table columns={columns} dataSource={this.state.attendance} style={{width: "100%"}} bordered />
        </div>
        
      </Content>
      <Footer/>
    </Layout>
  </Layout>
  );
  }
  }

export default ClassDetail;
