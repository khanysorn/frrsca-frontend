import React from "react";
import { Layout, Breadcrumb, Avatar, Table, message } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
import AuthenProvider from '../../services/authen_provider'
const { Header, Content, Sider } = Layout;


const columns = [
  {
    title: 'ครั้งที่',
    dataIndex: 'runningnumber',
    render: () => (
      <Avatar />
    ),
  },
  {
    title: 'วันที่',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'ตรงเวลา',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'สายครั้งที่ 1',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'สายครั้งที่ 2',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'สายครั้งที่ 3',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'ขาด',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'ลา',
    key: 'isontime',
    dataIndex: 'isontime'
  }
];
class ClassDetail extends React.Component {

  state = {
    collapsed: false,
  };

  async componentDidMount()  {
    if (localStorage.getItem("token")){
        const result = await AuthenProvider.fetchme()
        console.log(result.data)
        // const { user_type } = result.data
        const user = {name_th:result.data.name_th,userid:result.data.user_id}
        this.setState({name:result.data.name_th,userid:result.data.user_id})
        console.log(result.data.name_th)
        console.log(user.name)
        
        if(result.data.user_type === "inst_group") {
            this.getSubjectList(user.userid);
        } else{
            this.props.history.push("/Unauthorized")
        }
        
    } else {
      message.error('กรุณาเข้าสู่ระบบ')
      this.props.history.push("/Login")
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
