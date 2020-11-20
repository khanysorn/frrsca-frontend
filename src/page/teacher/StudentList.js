import React from "react";
import { Layout, Breadcrumb, Table, Avatar, Space } from 'antd';
import MenuBar from '../../components/teacher/Menu'
import User from '../../components/User'
import Footer from '../../components/Footer';
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
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'ชื่อ - นามสกุล',
    key: 'isontime',
    dataIndex: 'isontime'
  },
  {
    title: 'อีเมลแอดเดรส',
    key: 'isontime',
    dataIndex: 'isontime'
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
    collapsed: false,
  };

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
        <User/>
        </Header>
      <Content style={{ margin: '0 16px' }}>
        <h1 style={{fontSize: '28px', margin: '16px 0'}}>รายชื่อนักศึกษา</h1>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>วิชาของคุณ</Breadcrumb.Item>
          <Breadcrumb.Item>INT305</Breadcrumb.Item>
          <Breadcrumb.Item>รายชื่อนักศึกษา</Breadcrumb.Item>
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
