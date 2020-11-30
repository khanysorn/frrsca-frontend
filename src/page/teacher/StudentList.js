import React from "react";
import { Layout, Breadcrumb, Table, Avatar, Space, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider';
import { getUser, setUser } from '../../helper'
import ClassProvider from '../../services/class_provider'

const { Header, Content, Sider } = Layout;


const columns = [
  {
    title: '',
    dataIndex: 'runningnumber',
    render: () => (
      <Avatar />
    ),
  },
  {
    title: 'รหัสนักศึกษา',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'ชื่อ - นามสกุล',
    key: 'name_th',
    dataIndex: 'name_th'
  },
  {
    title: 'อีเมลแอดเดรส',
    key: 'email',
    dataIndex: 'email'
  },
  {
    title: 'ดำเนินการ',
    render: (text, record) => (
      <Space size="middle">
        <a href="https://lel">ลบ</a>
      </Space>
    )
  }
];


class ClassDetail extends React.Component {

  state = {
    data:[],
    collapsed: false,
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
            
        } else{
            this.props.history.push("/Unauthorized")
        }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
    }
    this.getData()
  }

  async getData () {
    this.setState({isLoading: true})
    try{
      const result = await ClassProvider.getlistallstudentenrollcourse({
        course_code: this.props.match.params.id,
        section_name: this.props.match.params.section,
        semester: 1,
        academicyear: 2563,
        lecturer_username: getUser().user_id
      })
      this.setState({ data: result.data })
      console.table(this.state.data);
    }catch(e){
      console.log(e)
    } finally {
      this.setState({ isLoading: false})
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
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>รายชื่อนักศึกษา</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.match.params.id}</Breadcrumb.Item>
          <Breadcrumb.Item>รายชื่อนักศึกษา</Breadcrumb.Item>
        </Breadcrumb>
        <Table columns={columns} dataSource={this.state.data} style={{width: "100%"}} bordered />
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
